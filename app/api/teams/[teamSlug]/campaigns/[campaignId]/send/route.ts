import { checkIfCampaignBelongsToTeam } from "@/actions/database/campaigns";
import { isTeamMember } from "@/actions/database/teamMembers";
import sendSMS from "@/actions/twilio/send-sms";
import { currentUserId } from "@/lib/auth";
import db from "@/lib/prisma";
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
          },
        },
        team: {
          select: {
            alphaSenderId: true,
          },
        },
      },
    });

    // Check if campaign exists
    if (!campaign) {
      return new NextResponse("Campaign not found", { status: 404 });
    }

    // Prepare messages for sending
    const messagesToSend = campaign.messages.map((message) => ({
      alphanumericSenderId: campaign.team.alphaSenderId,
      phoneNumber: message.recipient.phone,
      message: message.message,
      messageId: message.id,
    }));

    // TODO: Implement your SMS sending function here
    // This is where you'll integrate with your SMS service
    // For each message in messagesToSend:
    // 1. Send the SMS
    // 2. Update the message status in the database
    // 3. Handle any errors

    // Track if all messages were sent successfully
    let allMessagesSent = true;

    for (const messageData of messagesToSend) {
      try {
        await sendSMS(
          messageData.alphanumericSenderId || "",
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

        allMessagesSent = false;
      }
    }

    // Update campaign status if all messages were sent successfully
    if (allMessagesSent) {
      await db.campaign.update({
        where: {
          id: campaignId,
        },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
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
