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

export async function getMessageByMessageId(
  teamSlug: string,
  campaignId: string,
  messageId: string
) {
  const message = await db.message.findFirst({
    where: {
      id: messageId,
      campaign: {
        id: campaignId,
        team: {
          slug: teamSlug,
        },
      },
    },
    include: {
      template: true,
      recipient: true,
    },
  });

  return message;
}

export async function checkIfMessageBelongsToCampaign(
  messageId: string,
  campaignId: string,
  teamSlug: string
): Promise<boolean> {
  try {
    const message = await db.message.findUnique({
      where: {
        id: messageId,
      },
      select: {
        campaign: {
          select: {
            id: true,
            team: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!message || !message.campaign || !message.campaign.team) {
      return false;
    }

    return (
      message.campaign.id === campaignId &&
      message.campaign.team.slug === teamSlug
    );
  } catch (error) {
    console.error(error);
    return false;
  }
}
