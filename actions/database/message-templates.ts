"use server";

import db from "@/lib/prisma";

/**
 * Get all message templates by team slug.
 *
 * @param teamSlug - The slug of the team for which to fetch templates.
 * @returns A promise that resolves to an array of messageTemplate objects.
 */
export async function getMessageTemplatesByTeamSlug(teamSlug: string) {
  const templates = await db.messageTemplate.findMany({
    where: {
      team: {
        slug: teamSlug,
      },
    },
  });

  return templates;
}

/**
 * Get a template by its unique template ID.
 *
 * @param templateId - The unique identifier of the template.
 * @returns A promise that resolves to the template object or null if not found.
 */
export async function getMessageTemplateByTemplateId(templateId: string) {
  const template = await db.messageTemplate.findUnique({
    where: {
      id: templateId,
    },
  });

  return template;
}

export async function checkIfTemplateBelongsToTeam(
  templateId: string,
  teamSlug: string
): Promise<boolean> {
  try {
    const template = await db.messageTemplate.findUnique({
      where: {
        id: templateId,
      },
      select: {
        team: {
          select: {
            slug: true,
          },
        },
      },
    });

    if (!template || !template.team) {
      return false;
    }

    return template.team.slug === teamSlug;
  } catch (error) {
    console.error("[CHECK_TEMPLATE_TEAM]", error);
    return false;
  }
}
