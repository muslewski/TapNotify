// GET, PATCH, DELETE specific campaign

import { isTeamMember } from "@/actions/teamMembers";
import { currentUserId } from "@/lib/auth";
import db from "@/lib/prisma";
import { replaceTemplateVariables } from "@/lib/replace-template-variables";
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

    // Get body from request
    const body = await req.json();
    const { title, contactIds, templateId } = body;

    // Check if title is provided
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
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

    // eslint-disable-next-line
    let updateData: any = {
      title,
    };

    // If templateId is provided, update template and regenerate messages
    if (templateId) {
      // Get the template to access its content
      const template = await db.messageTemplate.findUnique({
        where: { id: templateId, team: { slug: teamSlug } },
        select: { content: true },
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
          name: true,
          phone: true,
        },
      });

      if (contacts.length !== contactIds.length) {
        return new NextResponse(
          "Some contacts were not found or don't belong to this team",
          { status: 400 }
        );
      }

      // Delete existing messages
      await db.message.deleteMany({
        where: {
          campaignId,
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

      // Create new messages
      updateData.messages = {
        create: contacts.map((contact) => {
          const processedMessage = replaceTemplateVariables(template.content, {
            name: contact.name || "",
            phone: contact.phone || "",
          });

          return {
            recipient: { connect: { id: contact.id } },
            message: processedMessage,
          };
        }),
      };
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
