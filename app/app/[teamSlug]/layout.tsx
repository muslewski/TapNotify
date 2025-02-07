import { currentUser } from "@/lib/auth";
import { ReactNode } from "react";
import db from "@/lib/prisma";
import { redirect } from "next/navigation";
import ClientLayout from "@/app/app/_components/client-layout";

interface TeamLayoutProps {
  children: ReactNode;
  params: Promise<{ teamSlug: string }>;
}

export default async function TeamLayout({
  children,
  params,
}: TeamLayoutProps) {
  const authUser = await currentUser();
  const { teamSlug } = await params;

  // Check if the user is authenticated
  if (!authUser) {
    return <div>Sign in to view this page</div>;
  }

  // Check if the user is a member of the team
  const teamMember = await db.teamMember.findFirst({
    where: {
      userId: authUser.id,
      team: {
        slug: teamSlug,
      },
    },
    include: {
      team: true,
    },
  });

  // If user is not a member of the team, redirect to available team
  if (!teamMember) {
    const availableTeam = await db.teamMember.findFirst({
      where: {
        userId: authUser.id,
      },
      include: {
        team: true,
      },
    });

    // Redirect to the available team or create team page
    if (availableTeam) {
      redirect(`/app/${availableTeam.team.slug}/dashboard`);
    } else {
      redirect("/app/create");
    }
  }

  return <ClientLayout teamSlug={teamSlug}>{children}</ClientLayout>;
}
