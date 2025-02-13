import { checkIfCampaignBelongsToTeam } from "@/actions/database/campaigns";
import { isTeamMember } from "@/actions/database/teamMembers";
import sendSMS from "@/actions/twilio/send-sms";
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
        alphanumericSenderId: campaign.alphanumericSenderId,
        messagingServiceSID: campaign.messagingServiceSID,
        phoneNumber: message.recipient.phone,
        message: message.template
          ? replaceTemplateVariables(message.template.content, {
              name: message.recipient.displayName || "",
              phone: message.recipient.phone || "",
            })
          : message.message || "",
        messageId: message.id,
      }));

    // Track successful and failed messages
    let successfulMessageCount = 0;
    let failedMessageCount = 0;

    for (const messageData of messagesToSend) {
      try {
        if (!messageData.message) {
          throw new Error("Message is empty");
        }

        await sendSMS(
          messageData.alphanumericSenderId || "",
          messageData.messagingServiceSID || "",
          messageData.phoneNumber,
          messageData.message
        );

        await db.message.update({
          where: {
            id: messageData.messageId,
          },
          data: {
            status: "SENT",
            sentAt: new Date(),
          },
        });

        successfulMessageCount++;
      } catch (error) {
        // Update message status to failed
        await db.message.update({
          where: {
            id: messageData.messageId,
          },
          data: {
            status: "FAILED",
            errorMessage:
              error instanceof Error ? error.message : "Unknown error",
          },
        });

        failedMessageCount++;
      }
    }

    // Get the total count of all messages in the campaign
    const totalMessages = await db.message.count({
      where: {
        campaignId: campaignId,
      },
    });

    // Get the count of failed messages in the campaign
    const totalFailedMessages = await db.message.count({
      where: {
        campaignId: campaignId,
        status: "FAILED",
      },
    });

    // Update campaign status based on message sending results
    // Set status to FAILED only if ALL messages in the campaign have failed
    if (totalFailedMessages === totalMessages) {
      await db.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          status: "FAILED",
          completedAt: new Date(),
        },
      });
    } else if (failedMessageCount === 0 && successfulMessageCount > 0) {
      // If all messages in this batch were successful
      await db.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
        },
      });
    } else {
      // If there's a mix of successful and failed messages, or if there are still unsent messages
      await db.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          status: "SENT",
        },
      });
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
