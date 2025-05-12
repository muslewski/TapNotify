// GET, PATCH, DELETE specific campaign

import { checkIfCampaignBelongsToTeam } from "@/actions/database/campaigns";
import { isTeamMember } from "@/actions/database/teamMembers";
// import { addAlphaSenderToService } from "@/actions/twilio/twilio-sender";
// import {
//   createMessageService,
//   deleteMessageService,
//   updateMessageService,
// } from "@/actions/twilio/twilio-service";
import { currentUserId } from "@/lib/auth";
import db from "@/lib/prisma";
import { validateAlphanumericSenderId } from "@/lib/validate-alpha-sender";
import { NextResponse } from "next/server";

interface CampaignFunctionParams {
  params: Promise<{
    teamSlug: string;
    campaignId: string;
  }>;
}

// This function handles GET request to get specific campaign
export async function GET(_req: Request, { params }: CampaignFunctionParams) {
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

    // Get campaign from database with associated messages and contacts
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
        template: true,
      },
    });

    // Check if campaign exists
    if (!campaign) {
      return new NextResponse("Campaign not found", { status: 404 });
    }

    return NextResponse.json(campaign);
  } catch (error) {
    console.log("[CAMPAIGN_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// This function handles PATCH request to update specific campaign
export async function PATCH(req: Request, { params }: CampaignFunctionParams) {
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

    // Get body from request
    const body = await req.json();
    const {
      title,
      alphanumericSenderId: alphaSenderId,
      contactIds,
      templateId,
    } = body;

    // Check if title is provided
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    // Check if alphanumericSenderId is provided and valid
    if (!alphaSenderId) {
      return new NextResponse("Alphanumeric Sender ID is required", {
        status: 400,
      });
    }

    // Check if at least one contactId or templateId is provided
    if (!contactIds && !templateId) {
      return new NextResponse("At least one contact or template is required", {
        status: 400,
      });
    }

    const isValidAlphaSender = validateAlphanumericSenderId(alphaSenderId);
    if (!isValidAlphaSender.isValid) {
      return new NextResponse(
        isValidAlphaSender.error || "Invalid Alphanumeric Sender ID",
        {
          status: 400,
        }
      );
    }

    // Get the existing campaign
    const existingCampaign = await db.campaign.findFirst({
      where: {
        id: campaignId,
        team: {
          slug: teamSlug,
        },
      },
    });

    if (!existingCampaign) {
      return new NextResponse("Campaign not found", { status: 404 });
    }

    if (
      // exclamation existingCampaign.messagingServiceSID ||
      !existingCampaign.alphanumericSenderId
    ) {
      return new NextResponse(
        "Alphanumeric Sender ID not found in the campaign",
        {
          status: 404,
        }
      );
    }

    // let updatedMessagingServiceSID = existingCampaign.messagingServiceSID;

    // check if the new alpha sender ID is different from the existing one
    // if (alphaSenderId !== existingCampaign.alphanumericSenderId) {
    //   console.log("Updating Alpha Sender ID in Messaging Service...");
    //   // Delete service from Twilio
    //   await deleteMessageService(existingCampaign.messagingServiceSID);
    //   // Create new service
    //   updatedMessagingServiceSID = await createMessageService(
    //     existingCampaign.title + ` (${teamSlug})`
    //   );
    //   // add alpha sender to the new service
    //   await addAlphaSenderToService(updatedMessagingServiceSID, alphaSenderId);
    // }

    // check if the new title is different from the existing one and update service friendly name
    // if (title !== existingCampaign.title) {
    //   console.log("Updating Campaign Title in Messaging Service...");
    //   await updateMessageService(
    //     updatedMessagingServiceSID,
    //     title + ` (${teamSlug})`
    //   );
    // }

    // eslint-disable-next-line
    let updateData: any = {
      title,
      alphanumericSenderId: alphaSenderId,
      messagingServiceSID: null,
    };

    // If templateId is provided, update template and regenerate messages
    if (templateId) {
      // Get the template
      const template = await db.messageTemplate.findUnique({
        where: { id: templateId, team: { slug: teamSlug } },
      });

      if (!template) {
        return new NextResponse("Template not found", { status: 404 });
      }

      updateData.template = { connect: { id: templateId } };
    }

    // If contactIds are provided, update contacts and messages
    if (Array.isArray(contactIds) && contactIds.length > 0) {
      // Get all contacts to access their names
      const contacts = await db.contact.findMany({
        where: {
          id: { in: contactIds },
          team: { slug: teamSlug },
        },
        select: {
          id: true,
          displayName: true,
          phone: true,
        },
      });

      if (contacts.length !== contactIds.length) {
        return new NextResponse(
          "Some contacts were not found or don't belong to this team",
          { status: 400 }
        );
      }

      // Get existing messages for this campaign
      const existingMessages = await db.message.findMany({
        where: {
          campaignId,
        },
        select: {
          recipientId: true,
          status: true,
        },
      });

      // Create a map of existing messages by recipient ID
      const existingMessagesByRecipient = new Map(
        existingMessages.map((msg) => [msg.recipientId, msg])
      );

      // Delete existing messages
      await db.message.deleteMany({
        where: {
          campaignId,
          status: { not: "SENT" },
        },
      });

      // Get the template (either new or existing)
      const template = await db.messageTemplate.findUnique({
        where: { id: templateId || existingCampaign.templateId },
        select: { content: true },
      });

      if (!template) {
        return new NextResponse("Template not found", { status: 404 });
      }

      // Create new messages only for contacts that don't have SENT messages
      const contactsNeedingNewMessages = contacts.filter((contact) => {
        const existingMessage = existingMessagesByRecipient.get(contact.id);
        return !existingMessage || existingMessage.status !== "SENT";
      });

      if (contactsNeedingNewMessages.length > 0) {
        updateData.messages = {
          create: contactsNeedingNewMessages.map((contact) => {
            return {
              recipient: { connect: { id: contact.id } },
              template: {
                connect: { id: templateId || existingCampaign.templateId },
              },
            };
          }),
        };
      }
    }

    // Update campaign in database
    const updatedCampaign = await db.campaign.update({
      where: {
        id: campaignId,
      },
      data: updateData,
      include: {
        messages: {
          include: {
            recipient: true,
          },
        },
        template: true,
      },
    });

    return NextResponse.json(updatedCampaign);
  } catch (error) {
    console.log("[CAMPAIGN_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

///!!!!!

// This function handles DELETE request to delete specific campaign
export async function DELETE(
  _req: Request,
  { params }: CampaignFunctionParams
) {
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

    // Get the message service SID from the campaign
    // const campaign = await db.campaign.findFirst({
    //   where: {
    //     id: campaignId,
    //     team: {
    //       slug: teamSlug,
    //     },
    //   },
    //   select: {
    //     messagingServiceSID: true,
    //   },
    // });

    // if (!campaign) {
    //   return new NextResponse("Campaign not found", { status: 404 });
    // }

    // if (!campaign.messagingServiceSID) {
    //   return new NextResponse("Messaging Service SID not found in campaign", {
    //     status: 404,
    //   });
    // }

    // Delete message service from Twilio
    // await deleteMessageService(campaign.messagingServiceSID);

    // Delete campaign from database (this will cascade delete associated messages)
    await db.campaign.delete({
      where: {
        id: campaignId,
        team: {
          slug: teamSlug,
        },
      },
    });

    return new NextResponse("Campaign deleted", { status: 200 });
  } catch (error) {
    console.log("[CAMPAIGN_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
