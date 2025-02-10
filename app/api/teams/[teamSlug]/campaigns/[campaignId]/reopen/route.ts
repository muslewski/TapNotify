import { isTeamMember } from "@/actions/database/teamMembers";
import { currentUserId } from "@/lib/auth";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ReopenFunctionParams {
  params: Promise<{
    teamSlug: string;
    campaignId: string;
  }>;
}

export async function POST(_req: Request, { params }: ReopenFunctionParams) {
  const { teamSlug, campaignId } = await params;

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

    // Check if campaignId is provided
    if (!campaignId) {
      return new NextResponse("Campaign ID is required", { status: 400 });
    }

    // Get campaign to verify it exists and belongs to the team
    const campaign = await db.campaign.findFirst({
      where: {
        id: campaignId,
        team: {
          slug: teamSlug,
        },
      },
    });

    // Check if campaign exists
    if (!campaign) {
      return new NextResponse("Campaign not found", { status: 404 });
    }

    // Check if campaign can be reopened (only FAILED or COMPLETED campaigns)
    if (campaign.status !== "FAILED" && campaign.status !== "COMPLETED") {
      return new NextResponse("Campaign cannot be reopened", { status: 400 });
    }

    // Update campaign status to DRAFT
    const updatedCampaign = await db.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        status: "DRAFT",
        completedAt: null, // Clear the completedAt timestamp
      },
      include: {
        messages: {
          include: {
            recipient: true,
          },
        },
      },
    });

    // Reset all message statuses to DRAFT
    await db.message.updateMany({
      where: {
        campaignId: campaignId,
      },
      data: {
        status: "DRAFT",
        sentAt: null,
        errorMessage: null,
      },
    });

    return NextResponse.json(updatedCampaign);
  } catch (error) {
    console.log("[CAMPAIGN_REOPEN]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
