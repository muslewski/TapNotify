// GET, PATCH, DELETE specific template

import { checkIfTemplateBelongsToTeam } from "@/actions/database/message-templates";
import { isTeamMember } from "@/actions/database/teamMembers";
import { currentUserId } from "@/lib/auth";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";

interface TemplateFunctionParams {
  params: Promise<{
    teamSlug: string;
    templateId: string;
  }>;
}

// This function handles GET request to get specific template
export async function GET(_req: Request, { params }: TemplateFunctionParams) {
  const { teamSlug, templateId } = await params;

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

    // Check if templateId is provided
    if (!templateId) {
      return new NextResponse("Template ID is required", { status: 400 });
    }

    // Check if template belongs to team
    if (!(await checkIfTemplateBelongsToTeam(templateId, teamSlug))) {
      return new NextResponse("Template does not belong to team", {
        status: 400,
      });
    }

    // Get template from database
    const template = await db.messageTemplate.findFirst({
      where: {
        id: templateId,
      },
    });

    // Check if template exists
    if (!template) {
      return new NextResponse("Template not found", { status: 404 });
    }

    return NextResponse.json(template);
  } catch (error) {
    console.log("[TEMPLATE_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// This function handles PATCH request to update specific template
export async function PATCH(req: Request, { params }: TemplateFunctionParams) {
  const { teamSlug, templateId } = await params;
  const userId = await currentUserId();

  try {
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

    // Check if templateId is provided
    if (!templateId) {
      return new NextResponse("Template ID is required", { status: 400 });
    }

    // Check if template belongs to team
    if (!(await checkIfTemplateBelongsToTeam(templateId, teamSlug))) {
      return new NextResponse("Template does not belong to team", {
        status: 400,
      });
    }

    // Get body from request
    const body = await req.json();
    const { title, content } = body;

    // Check if title is provided
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    // Check if content is provided
    if (!content) {
      return new NextResponse("Content is required", { status: 400 });
    }

    // Update template in database
    const template = await db.messageTemplate.update({
      where: {
        id: templateId,
      },
      data: {
        title: title,
        content: content,
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.log("[TEMPLATE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// This function handles DELETE request to delete specific template
export async function DELETE(
  _req: Request,
  { params }: TemplateFunctionParams
) {
  const { teamSlug, templateId } = await params;
  const userId = await currentUserId();

  try {
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

    // Check if templateId is provided
    if (!templateId) {
      return new NextResponse("Template ID is required", { status: 400 });
    }

    // Check if template belongs to team
    if (!(await checkIfTemplateBelongsToTeam(templateId, teamSlug))) {
      return new NextResponse("Template does not belong to team", {
        status: 400,
      });
    }

    // Delete template from database
    await db.messageTemplate.delete({
      where: {
        id: templateId,
      },
    });

    return new NextResponse("Template deleted", { status: 200 });
  } catch (error) {
    console.log("[TEMPLATE_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
