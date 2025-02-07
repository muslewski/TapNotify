import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

// This page is to redirect user to the correct team section
export default async function TeamRedirectPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const authUser = await currentUser();
  const { teamSlug } = await params;

  if (!authUser) {
    return <div>Sign in to view this page</div>;
  }

  // Redirect to the team page
  redirect(`/app/${teamSlug}/dashboard`);
}
