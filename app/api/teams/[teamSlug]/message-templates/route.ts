// GET, POST templates

import { isTeamMember } from "@/actions/teamMembers";
import { currentUserId } from "@/lib/auth";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";

interface MessageTemplatesFunctionParams {
  params: Promise<{
    teamSlug: string;
  }>;
}

// This function handles GET requests to fetch all templates
export async function GET(
  req: Request,
  { params }: MessageTemplatesFunctionParams
) {
  const { teamSlug } = await params;

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

    // Get messageTemplates from database
    const templates = await db.messageTemplate.findMany({
      where: {
        team: {
          slug: teamSlug,
        },
      },
    });

    // Check if templates exist
    if (!templates) {
      return new NextResponse("Templates not found", { status: 404 });
    }

    return NextResponse.json(templates);
  } catch (error) {
    console.log("[TEMPLATES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// This function handles POST requests to create new template
export async function POST(
  req: Request,
  { params }: MessageTemplatesFunctionParams
) {
  const { teamSlug } = await params;

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

    // Get body from request
    const body = await req.json();
    const { title, content } = body;

    // Check if name is provided
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    // Check if content is provided
    if (!content) {
      return new NextResponse("Content is required", { status: 400 });
    }

    // Create template in database
    const template = await db.messageTemplate.create({
      data: {
        title: title,
        content: content,
        user: {
          connect: {
            id: userId,
          },
        },
        team: {
          connect: {
            slug: teamSlug,
          },
        },
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.log("[TEMPLATES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
