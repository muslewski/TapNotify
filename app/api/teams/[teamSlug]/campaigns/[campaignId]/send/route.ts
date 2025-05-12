import { checkIfCampaignBelongsToTeam } from "@/actions/database/campaigns";
import { isTeamMember } from "@/actions/database/teamMembers";
import sendBulkSMS from "@/actions/justsend/send-sms";
import { currentUserId } from "@/lib/auth";
import db from "@/lib/prisma";
import { replaceTemplateVariables } from "@/lib/replace-template-variables";
import { NextResponse } from "next/server";

interface SendFunctionParams {
  params: Promise<{
    teamSlug: string;
    campaignId: string;
  }>;
}
// This function handles POST request to send SMS for a campaign
export async function POST(_req: Request, { params }: SendFunctionParams) {
  const { teamSlug, campaignId } = await params;

  try {
    // Get currently authenticated user ID
    const userId = await currentUserId();

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if teamSlug is provided
    if (!teamSlug) {
      return new NextResponse("Team Slug is required", { status: 400 });
    }

    // Check if user is a member of the team
    if (!(await isTeamMember(userId, teamSlug))) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if campaignId is provided
    if (!campaignId) {
      return new NextResponse("Campaign ID is required", { status: 400 });
    }

    // Check if campaign belongs to the team
    if (!(await checkIfCampaignBelongsToTeam(campaignId, teamSlug))) {
      return new NextResponse("Campaign not found", { status: 404 });
    }

    // Get campaign with messages and recipients
    const campaign = await db.campaign.findFirst({
      where: {
        id: campaignId,
        team: {
          slug: teamSlug,
        },
      },
      include: {
        template: true,
        messages: {
          include: {
            recipient: true,
            template: true,
          },
        },
      },
    });

    // Check if campaign exists
    if (!campaign) {
      return new NextResponse("Campaign not found", { status: 404 });
    }

    // Prepare messages for sending
    const messagesToSend = campaign.messages
      .filter((message) => message.status !== "SENT") // Skip messages that are already sent
      .map((message) => ({
        phoneNumber: message.recipient.phone,
        message: message.template
          ? replaceTemplateVariables(message.template.content, {
              name: message.recipient.displayName || "",
              phone: message.recipient.phone || "",
            })
          : message.message || "",
        messageId: message.id,
      }));

    if (messagesToSend.length === 0) {
      return NextResponse.json({ message: "No messages to send" });
    }

    try {
      await sendBulkSMS(
        campaign.alphanumericSenderId || "INFO",
        campaign.title,
        messagesToSend.map((message) => ({
          msisdn: message.phoneNumber,
          // content: message.message,
        })),
        campaign.template.content
      );

      // Mark all messages as PENDING
      await db.message.updateMany({
        where: {
          id: {
            in: messagesToSend.map((message) => message.messageId),
          },
        },
        data: {
          status: "SENT",
          sentAt: new Date(),
        },
      });

      // UPDATE CAMPAING STATUS
      await db.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          status: "COMPLETED",
        },
      });

      return NextResponse.json({
        message: "Bulk SMS sent successfully",
        status: "PENDING",
      });
    } catch (error) {
      console.error("Error sending bulk SMS:", error);
      return new NextResponse("Error sending bulk SMS", { status: 500 });
    }

    // Return the campaign with updated message statuses
    const updatedCampaign = await db.campaign.findFirst({
      where: {
        id: campaignId,
      },
      include: {
        messages: {
          include: {
            recipient: true,
          },
        },
      },
    });

    return NextResponse.json(updatedCampaign);
  } catch (error) {
    console.log("[CAMPAIGN_SEND]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
