"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

// This page is to redirect user to the correct team section
export default function TeamRedirectPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const authUser = useCurrentUser();
  const { teamSlug } = use(params);
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      router.push(`/app/${teamSlug}/dashboard`);
    }
  }, [authUser, teamSlug, router]);

  if (!authUser) {
    return <div>Sign in to view this page</div>;
  }

  return null;
}
