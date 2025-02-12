"use server";

import db from "@/lib/prisma";

export async function getMessagesFromCampaign(
  teamSlug: string,
  campaignId: string
) {
  const messages = await db.message.findMany({
    where: {
      campaign: {
        id: campaignId,
        team: {
          slug: teamSlug,
        },
      },
    },
    include: {
      template: {
        include: {
          user: true,
        },
      },
      recipient: {
        include: {
          user: true,
        },
      },
    },
  });

  return messages;
}
