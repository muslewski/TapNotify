// GET, PATCH, DELETE specific team

import { isTeamMember } from "@/actions/database/teamMembers";
import {
  DeleteMessageService,
  updateMessageService,
} from "@/actions/twilio/twilio-service";
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
    const { name, slug, logoUrl } = body;

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

    // get messaging service SID from team that we want to update and select only the SID
    const teamWithSID = await db.team.findUnique({
      where: {
        slug: teamSlug,
      },
      select: {
        MessagingServiceSID: true,
      },
    });

    // check if team exists
    if (!teamWithSID || !teamWithSID.MessagingServiceSID) {
      return new NextResponse("Team not found", { status: 404 });
    }

    // update message service friendly name
    await updateMessageService(teamWithSID.MessagingServiceSID, name);

    // update team in database
    const team = await db.team.update({
      where: {
        slug: teamSlug,
      },
      data: {
        name,
        slug,
        logoUrl,
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

    // Get messaging service SID from team that we want to delete and select only the SID
    const teamWithSID = await db.team.findUnique({
      where: {
        slug: teamSlug,
      },
      select: {
        MessagingServiceSID: true,
      },
    });

    if (!teamWithSID || !teamWithSID.MessagingServiceSID) {
      return new NextResponse("Team not found", { status: 404 });
    }

    // delete message service from Twilio
    await DeleteMessageService(teamWithSID.MessagingServiceSID);

    // delete team in database
    const team = await db.team.delete({
      where: {
        slug: teamSlug,
      },
    });

    return NextResponse.json(team);
  } catch (error) {
    console.log("[TEAM_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
