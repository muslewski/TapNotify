"use server";

import db from "@/lib/prisma";

export async function getUserById(userId: string) {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  return user;
}
