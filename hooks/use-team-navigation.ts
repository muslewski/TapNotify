import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { Team } from "@prisma/client";

// Custom hook for team URL management
export const useTeamNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const getCurrentTeamSlug = useCallback(() => {
    const matches = pathname.match(/\/app\/([^/]+)/);
    return matches ? matches[1] : null;
  }, [pathname]);

  const navigateToTeam = useCallback(
    (team: Team) => {
      // Get the current team slug
      const currentTeamSlug = getCurrentTeamSlug();

      if (!currentTeamSlug) {
        // If no team in URL, default to dashboard
        router.push(`/app/${team.slug}/dashboard`);
        return;
      }

      // Replace current team slug with new team slug while preserving the rest of the path
      const newPath = pathname.replace(
        `/app/${currentTeamSlug}`,
        `/app/${team.slug}`
      );

      router.push(newPath);
    },
    [pathname, router, getCurrentTeamSlug]
  );

  return {
    navigateToTeam,
    router,
  };
};
