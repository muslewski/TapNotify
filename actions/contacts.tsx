"use server";

import db from "@/lib/prisma";

export async function getPhoneNumbersByTeamSlug(teamSlug: string) {
  const phoneNumbers = await db.phoneNumber.findMany({
    where: {
      team: {
        slug: teamSlug,
      },
    },
  });

  return phoneNumbers;
}

export async function getPhoneNumberByPhoneId(phoneId: string) {
  const phoneNumber = await db.phoneNumber.findUnique({
    where: {
      id: phoneId,
    },
  });

  return phoneNumber;
}
