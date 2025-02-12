"use client";

import Loading from "@/components/loading";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useTeamStore } from "@/store/use-team-store";
import { useRouter } from "next/navigation"; // Changed from next/router
import { useEffect, useState } from "react";

export default function AppRedirectPage() {
  const router = useRouter();
  const authUser = useCurrentUser();
  const { activeTeam, fetchTeams } = useTeamStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Handle team fetching
    if (authUser && authUser.id && !activeTeam) {
      fetchTeams(authUser.id)
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  }, [authUser, activeTeam, fetchTeams]);

  useEffect(() => {
    // Handle navigation
    if (activeTeam) {
      router.push(`/app/${activeTeam.slug}/dashboard`);
    }
  }, [activeTeam, router]);

  if (!authUser || !authUser.id) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading teams: {error.message}</div>;
  }

  if (isLoading || activeTeam) {
    return <Loading />;
  }

  router.push(`/app/create-team`);
}
