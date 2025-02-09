import { currentUser } from "@/lib/auth";
import { ReactNode } from "react";
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
  if (!authUser || !authUser.id) {
    return <div>Sign in to view this page</div>;
  }

  return (
    <ClientLayout teamSlug={teamSlug} userId={authUser.id}>
      {children}
    </ClientLayout>
  );
}
