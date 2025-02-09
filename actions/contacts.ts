"use server";

import db from "@/lib/prisma";

export async function getContactsByTeamSlug(teamSlug: string) {
  const contacts = await db.contact.findMany({
    where: {
      team: {
        slug: teamSlug,
      },
    },
  });

  return contacts;
}

export async function getContactByContactId(contactId: string) {
  const contact = await db.contact.findUnique({
    where: {
      id: contactId,
    },
  });

  return contact;
}

// Check if contact with the same phone number already exists in the team
export async function doesContactExistInTeam(phone: string, teamSlug: string) {
  const contact = await db.contact.findFirst({
    where: {
      AND: [
        { phone: phone ?? "NO_PHONE" },
        {
          team: {
            slug: teamSlug ?? "NO_TEAM_SLUG",
          },
        },
      ],
    },
  });

  return contact;
}
