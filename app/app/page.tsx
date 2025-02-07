import { currentUser } from "@/lib/auth";
import db from "@/lib/prisma";
import { redirect } from "next/navigation";

// This page is used to redirect users to the correct team page
export default async function AppRedirectPage() {
  const authUser = await currentUser();

  if (!authUser) {
    return <div>Sign in to view this page</div>;
  }

  // Find first Team Member record for the authenticated user
  const teamMember = await db.teamMember.findFirst({
    where: {
      userId: authUser.id,
    },
    include: {
      team: true,
    },
  });

  // If user is not a member of any team, redirect to create team
  if (!teamMember || !teamMember.team?.slug) {
    redirect("/app/create");
  }

  // Redirect to the team page dashboard
  redirect(`/app/${teamMember.team.slug}/dashboard`);
}
