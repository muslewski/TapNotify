// GET, POST contacts

import { doesContactExistInTeam } from "@/actions/database/contacts";
import { isTeamMember } from "@/actions/database/teamMembers";
import { currentUserId } from "@/lib/auth";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ContactsFunctionParams {
  params: Promise<{
    teamSlug: string;
  }>;
}

// This function handles GET requests to fetch all contacts
export async function GET(req: Request, { params }: ContactsFunctionParams) {
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

    // Get contacts from database
    const contacts = await db.contact.findMany({
      where: {
        team: {
          slug: teamSlug,
        },
      },
    });

    // Check if contacts exist
    if (!contacts) {
      return new NextResponse("Contacts not found", { status: 404 });
    }

    return NextResponse.json(contacts);
  } catch (error) {
    console.log("[CONTACTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// This function handles POST requests to create new contact
export async function POST(req: Request, { params }: ContactsFunctionParams) {
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
    const { name, phone } = body;

    // Check if name is provided
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // Check if phone is provided
    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }

    // Check if contact with the same phone number already exists in the team
    const existingContact = await doesContactExistInTeam(phone, teamSlug);

    if (existingContact) {
      return new NextResponse(
        "Contact with the same phone number already exists",
        { status: 409 }
      );
    }

    // Create contact in database
    const contact = await db.contact.create({
      data: {
        name,
        phone,
        user: {
          connect: {
            id: userId,
          },
        },
        team: {
          connect: {
            slug: teamSlug,
          },
        },
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.log("[CONTACTS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
