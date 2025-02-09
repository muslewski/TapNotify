import db from "@/lib/prisma";

// Check if user is a member of the team
export async function isTeamMember(userId: string, teamSlug: string) {
  const teamMember = await db.teamMember.findFirst({
    where: {
      AND: [
        { userId: userId ?? "NO_USER_ID" },
        {
          team: {
            slug: teamSlug,
          },
        },
      ],
    },
  });

  return teamMember;
}
