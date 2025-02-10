"use server";

import db from "@/lib/prisma";

/**
 * Get all contacts by team slug.
 *
 * @param teamSlug - The slug of the team for which to fetch contacts.
 * @returns A promise that resolves to an array of contact objects.
 */
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

/**
 * Get a contact by its unique contact ID.
 *
 * @param contactId - The unique identifier of the contact.
 * @returns A promise that resolves to the contact object or null if not found.
 */
export async function getContactByContactId(contactId: string) {
  const contact = await db.contact.findUnique({
    where: {
      id: contactId,
    },
  });

  return contact;
}

/**
 * Check if a contact with the same phone number already exists in the team.
 *
 * @param phone - The phone number of the contact to check.
 * @param teamSlug - The slug of the team to check the contact within.
 * @returns A promise that resolves to the contact object if a match is found, or null if not.
 */
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

/**
 * Check if a contact with the same phone number already exists in the team, excluding the provided contact ID.
 *
 * @param phone - The phone number of the contact to check.
 * @param teamSlug - The slug of the team to check the contact within.
 * @param contactId - The ID of the contact to exclude from the check.
 * @returns A promise that resolves to the contact object if a match is found, or null if not.
 */
export async function doesContactExistAndNotSameContact(
  phone: string,
  teamSlug: string,
  contactId: string
) {
  const contact = await db.contact.findFirst({
    where: {
      AND: [
        { phone: phone ?? "NO_PHONE" },
        {
          team: {
            slug: teamSlug ?? "NO_TEAM_SLUG",
          },
        },
        {
          id: {
            not: contactId,
          },
        },
      ],
    },
  });

  return contact;
}
