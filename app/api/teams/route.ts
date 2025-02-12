import { NextResponse } from "next/server";
import { currentUserId } from "@/lib/auth";
import db from "@/lib/prisma";
import slugify from "slugify";
import { createMessageService } from "@/actions/twilio/twilio-service";

// This function handles POST requests to create new team
export async function POST(req: Request) {
  try {
    // Get currently authenticated user ID
    const userId = await currentUserId();

    //  Get body from request
    const body = await req.json();
    const { name, logoUrl } = body;

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if name is provided
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // Create message service before creating team
    // We will use this message service to send SMS messages
    let messageServiceSid;
    try {
      messageServiceSid = await createMessageService(name);
    } catch (error) {
      console.error("[CREATE_MESSAGE_SERVICE_ERROR]", error);
      return new NextResponse("Failed to create message service", {
        status: 500,
      });
    }

    // Create base slug from name
    let slug = slugify(name, {
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true,
      trim: true,
    });

    // Ensure slug is unique by appending a number if necessary
    let uniqueSlug = slug;
    let counter = 1;
    while (await db.team.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
    slug = uniqueSlug;

    // Create team in database
    const team = await db.team.create({
      data: {
        name: name,
        slug: slug,
        logoUrl: logoUrl,
        messagingServiceSID: messageServiceSid,
      },
    });

    // Add user as a member of the team
    const teamMember = await db.teamMember.create({
      data: {
        teamId: team.id,
        userId: userId,
      },
    });

    // Return the created team as JSON response
    return NextResponse.json({ team, teamMember });
  } catch (error) {
    console.log("[TEAMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
