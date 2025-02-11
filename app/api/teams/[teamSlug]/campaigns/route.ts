// GET, POST campaigns

import { isTeamMember } from "@/actions/database/teamMembers";
import { currentUserId } from "@/lib/auth";
import db from "@/lib/prisma";
import { replaceTemplateVariables } from "@/lib/replace-template-variables";
import { validateAlphanumericSenderId } from "@/lib/validate-alpha-sender";
import { NextResponse } from "next/server";

interface CampaignsFunctionParams {
  params: Promise<{
    teamSlug: string;
  }>;
}

// This function handles GET requests to fetch all campaigns
export async function GET(req: Request, { params }: CampaignsFunctionParams) {
  const { teamSlug } = await params;

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

    // Get campgains from database
    const campaigns = await db.campaign.findMany({
      where: {
        team: {
          slug: teamSlug,
        },
      },
    });

    // Check if campaigns exist
    if (!campaigns) {
      return new NextResponse("Campaigns not found", { status: 404 });
    }

    return NextResponse.json(campaigns);
  } catch (error) {
    console.log("[CAMPAIGNS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// This function handles POST requests to create new campaign
export async function POST(req: Request, { params }: CampaignsFunctionParams) {
  const { teamSlug } = await params;

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

    // Get body from request
    const body = await req.json();
    const { title, alphanumericSenderId, contactIds, templateId } = body;

    // Check if name is provided
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    // Check if alphanumericSenderId is provided and valid
    if (!alphanumericSenderId) {
      return new NextResponse("Alphanumeric Sender ID is required", {
        status: 400,
      });
    }

    const isValidAlphaSender =
      validateAlphanumericSenderId(alphanumericSenderId);
    if (!isValidAlphaSender.isValid) {
      return new NextResponse(
        isValidAlphaSender.error || "Invalid Alphanumeric Sender ID",
        {
          status: 400,
        }
      );
    }

    // Check if contact Ids is provided
    if (!Array.isArray(contactIds) || contactIds.length === 0) {
      return new NextResponse("At least one contact ID is required", {
        status: 400,
      });
    }
    // Check if template Id is provided
    if (!templateId) {
      return new NextResponse("Template ID is required", { status: 400 });
    }

    // Get the template to access its content
    const template = await db.messageTemplate.findUnique({
      where: { id: templateId, team: { slug: teamSlug } },
      select: { content: true },
    });

    if (!template) {
      return new NextResponse("Template not found", { status: 404 });
    }

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

    // Create campaign and messages in a transaction
    const newCampaign = await db.$transaction(async (tx) => {
      const campaign = await tx.campaign.create({
        data: {
          title,
          team: { connect: { slug: teamSlug } },
          user: { connect: { id: userId } },
          template: { connect: { id: templateId } },
          messages: {
            create: contacts.map((contact) => {
              try {
                const processedMessage = replaceTemplateVariables(
                  template.content,
                  {
                    name: contact.name || "",
                    phone: contact.phone || "",
                  }
                );

                return {
                  recipient: { connect: { id: contact.id } },
                  message: processedMessage,
                };
              } catch (error) {
                console.error(
                  `Error processing template for contact ${contact.id}:`,
                  error
                );
                throw new Error(
                  `Failed to process template for contact ${contact.id}`
                );
              }
            }),
          },
        },
      });
      return campaign;
    });

    return NextResponse.json(newCampaign);
  } catch (error) {
    console.log("[CAMPAIGNS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
