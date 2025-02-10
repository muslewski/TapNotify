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
      template: true,
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
      template: true,
    },
  });

  return campaign;
}
