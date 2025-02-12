"use server";

import db from "@/lib/prisma";

export async function getCampaignsByTeamSlug(teamSlug: string) {
  const campaigns = await db.campaign.findMany({
    where: {
      team: {
        slug: teamSlug,
      },
    },
    include: {
      template: {
        include: { user: true },
      },
      messages: true,
    },
  });

  return campaigns;
}

export async function getCampaignByCampaignId(campaignId: string) {
  const campaign = await db.campaign.findUnique({
    where: {
      id: campaignId,
    },
    include: {
      messages: {
        include: { recipient: true },
      },
      template: {
        include: { user: true },
      },
    },
  });

  return campaign;
}

export async function checkIfCampaignBelongsToTeam(
  campaignId: string,
  teamSlug: string
): Promise<boolean> {
  try {
    const campaign = await db.campaign.findUnique({
      where: {
        id: campaignId,
      },
      select: {
        team: {
          select: {
            slug: true,
          },
        },
      },
    });

    if (!campaign || !campaign.team) {
      return false;
    }

    return campaign.team.slug === teamSlug;
  } catch (error) {
    console.error("Error checking campaign team:", error);
    return false;
  }
}
