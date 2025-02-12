// GET, PATCH, DELETE specific contact

import {
  checkIfContactBelongsToTeam,
  doesContactExistAndNotSameContact,
} from "@/actions/database/contacts";
import { isTeamMember } from "@/actions/database/teamMembers";
import { currentUserId } from "@/lib/auth";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ContactFunctionParams {
  params: Promise<{
    teamSlug: string;
    contactId: string;
  }>;
}

// This function handles GET request to get specific contact
export async function GET(_req: Request, { params }: ContactFunctionParams) {
  const { teamSlug, contactId } = await params;

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

    // Check if contactId is provided
    if (!contactId) {
      return new NextResponse("Contact ID is required", { status: 400 });
    }

    // Check if contact belongs to the team
    if (!(await checkIfContactBelongsToTeam(contactId, teamSlug))) {
      return new NextResponse("Contact not found", { status: 404 });
    }

    // Get contact from database
    const contact = await db.contact.findFirst({
      where: {
        id: contactId,
      },
    });

    // Check if contact exists
    if (!contact) {
      return new NextResponse("Contact not found", { status: 404 });
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.log("[CONTACT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// This function handles PATCH request to update specific contact
export async function PATCH(req: Request, { params }: ContactFunctionParams) {
  const { teamSlug, contactId } = await params;
  const userId = await currentUserId();

  try {
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

    // Check if contactId is provided
    if (!contactId) {
      return new NextResponse("Contact ID is required", { status: 400 });
    }

    // Check if contact belongs to the team
    if (!(await checkIfContactBelongsToTeam(contactId, teamSlug))) {
      return new NextResponse("Contact not found", { status: 404 });
    }

    // Get body from request
    const body = await req.json();
    const { contactLabel, displayName, phone } = body;

    // Check if contactLabel is provided
    if (!contactLabel) {
      return new NextResponse("Contact Label is required", { status: 400 });
    }

    // Check if displayName is provided
    if (!displayName) {
      return new NextResponse("Display Name is required", { status: 400 });
    }

    // Check if phone is provided
    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }

    // Check if contact with the same phone number already exists in the team
    const existingContact = await doesContactExistAndNotSameContact(
      phone,
      teamSlug,
      contactId
    );

    if (existingContact) {
      return new NextResponse(
        "Contact with the same phone number already exists",
        { status: 409 }
      );
    }

    // Update contact in database
    const contact = await db.contact.update({
      where: {
        id: contactId,
      },
      data: {
        contactLabel,
        displayName,
        phone,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.log("[CONTACT_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// This function handles DELETE request to delete specific contact
export async function DELETE(_req: Request, { params }: ContactFunctionParams) {
  const { teamSlug, contactId } = await params;
  const userId = await currentUserId();

  try {
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

    // Check if contactId is provided
    if (!contactId) {
      return new NextResponse("Contact ID is required", { status: 400 });
    }

    // Check if contact belongs to the team
    if (!(await checkIfContactBelongsToTeam(contactId, teamSlug))) {
      return new NextResponse("Contact not found", { status: 404 });
    }

    // Delete contact from database
    await db.contact.delete({
      where: {
        id: contactId,
      },
    });

    return new NextResponse("Contact deleted", { status: 200 });
  } catch (error) {
    console.log("[CONTACT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
