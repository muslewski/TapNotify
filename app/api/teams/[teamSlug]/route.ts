// GET, PATCH, DELETE specific team

import { isTeamMember } from "@/actions/database/teamMembers";
import { deleteMessageService } from "@/actions/twilio/twilio-service";
import { currentUserId } from "@/lib/auth";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";

interface TeamFunctionParams {
  params: Promise<{
    teamSlug: string;
  }>;
}

// This function handles PATH requests to update a team
export async function PATCH(req: Request, { params }: TeamFunctionParams) {
  const { teamSlug } = await params;

  try {
    const userId = await currentUserId();

    const body = await req.json();
    const { name, slug, logoUrl, defaultCountryCode } = body;

    // check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // check if name is provided
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // check if params contains teamSlug
    if (!teamSlug) {
      return new NextResponse("Team Slug is required", { status: 400 });
    }

    // check if phone country code is provided
    if (!defaultCountryCode) {
      return new NextResponse("Default Country Code is required", {
        status: 400,
      });
    }

    // check if user is a member of the team
    if (!(await isTeamMember(userId, teamSlug))) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // check if the new slug is different and if it is already taken
    if (slug !== teamSlug) {
      const existingTeam = await db.team.findUnique({
        where: { slug },
      });

      if (existingTeam) {
        return new NextResponse("Slug is already taken", { status: 409 });
      }
    }

    // update team in database
    const team = await db.team.update({
      where: {
        slug: teamSlug,
      },
      data: {
        name,
        slug,
        logoUrl,
        defaultCountryCode,
      },
    });

    return NextResponse.json(team);
  } catch (error) {
    console.log("[TEAM_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// This function handles DELETE requests to delete a team
export async function DELETE(_req: Request, { params }: TeamFunctionParams) {
  const { teamSlug } = await params;

  try {
    const userId = await currentUserId();

    // check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // check if params contains teamSlug
    if (!teamSlug) {
      return new NextResponse("Team Slug is required", { status: 400 });
    }

    // check if user is a member of the team
    if (!(await isTeamMember(userId, teamSlug))) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the team first to ensure it exists
    const team = await db.team.findUnique({
      where: { slug: teamSlug },
      include: {
        campaigns: true,
        contacts: true,
        messageTemplates: true,
        members: true,
      },
    });

    if (!team) {
      return new NextResponse("Team not found", { status: 404 });
    }

    // Delete the team and all related records in a transaction
    const deletedTeam = await db.$transaction(async (tx) => {
      // First, delete all Twilio message services
      const deleteMessageServicePromises = team.campaigns
        .filter((campaign) => campaign.messagingServiceSID) // Filter out campaigns without messagingServiceSID
        .map(async (campaign) => {
          try {
            if (campaign.messagingServiceSID) {
              await deleteMessageService(campaign.messagingServiceSID);
              console.log(
                `[TWILIO_SERVICE_DELETE] Successfully deleted service ${campaign.messagingServiceSID}`
              );
            }
          } catch (error) {
            console.error(
              `[TWILIO_SERVICE_DELETE] Failed to delete service ${campaign.messagingServiceSID}:`,
              error
            );
            // Continue with other deletions even if one message service deletion fails
          }
        });

      // Wait for all message service deletions to complete
      await Promise.all(deleteMessageServicePromises);

      // Delete all messages related to campaigns in this team
      await tx.message.deleteMany({
        where: {
          campaign: {
            teamId: team.id,
          },
        },
      });

      // Delete all campaigns
      await tx.campaign.deleteMany({
        where: { teamId: team.id },
      });

      // Delete all message templates
      await tx.messageTemplate.deleteMany({
        where: { teamId: team.id },
      });

      // Delete all contacts
      await tx.contact.deleteMany({
        where: { teamId: team.id },
      });

      // Delete all team members
      await tx.teamMember.deleteMany({
        where: { teamId: team.id },
      });

      // Finally delete the team
      return tx.team.delete({
        where: { slug: teamSlug },
      });
    });

    console.log("[TEAM_DELETE]", deletedTeam);

    return NextResponse.json(deletedTeam);
  } catch (error) {
    console.log("[TEAM_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
