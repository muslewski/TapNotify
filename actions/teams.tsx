"use server";

import db from "@/lib/prisma";

export async function getUserTeamsById(userId: string) {
  const teams = await db.team.findMany({
    where: {
      members: {
        some: {
          userId: userId,
        },
      },
    },
  });

  return teams;
}
