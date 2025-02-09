"use client";

import AppSidebar from "@/components/nav/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useTeamStore } from "@/store/use-team-store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import Loading from "@/app/app/_components/loading";
import { sidebarData } from "@/data/sidebar-data";

interface ClientTeamLayoutProps {
  children: ReactNode;
  userId: string;
  teamSlug: string;
}

// Moved to a separate function for better organization
function useTeamAccess(userId: string, teamSlug: string) {
  const router = useRouter();
  const { activeTeam, teams, fetchTeams, setActiveTeam } = useTeamStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch teams if needed
  useEffect(() => {
    if (userId && !teams.length) {
      fetchTeams(userId)
        .catch(setError)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [userId, teams.length, fetchTeams]);

  // Handle team access and navigation
  useEffect(() => {
    if (!isLoading) {
      if (teams.length === 0) {
        // Redirect to create team page
        router.push("/app/create-team");
        return;
      }

      const currentTeam = teams.find((team) => team.slug === teamSlug);

      if (currentTeam) {
        // Set active team if it's different from current
        if (!activeTeam || activeTeam.slug !== teamSlug) {
          setActiveTeam(currentTeam);
        }
      } else {
        console.log("No access to team", teamSlug);
        // Redirect to first available team or create team page
        const firstTeam = teams[0];
        router.push(`/app/${firstTeam.slug}/dashboard`);
      }
    }
  }, [isLoading, teams, teamSlug, activeTeam, setActiveTeam, router]);

  return {
    isLoading,
    error,
    hasAccess: teams.some((team) => team.slug === teamSlug),
  };
}

// Moved breadcrumb generation to a custom hook
function useBreadcrumbs(pathname: string, teamSlug: string) {
  return React.useMemo(() => {
    const navData = sidebarData(teamSlug).navMain;
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];
    let currentPath = "";

    for (const path of paths) {
      currentPath += `/${path}`;
      const navItem =
        navData.find((item) => item.url === currentPath) ||
        navData
          .flatMap((item) => item.items)
          .find((subItem) => subItem?.url === currentPath);

      if (navItem) {
        breadcrumbs.push({
          href: navItem.url,
          label: navItem.title,
          isLast: currentPath === pathname,
        });
      }
    }

    return breadcrumbs;
  }, [pathname, teamSlug]);
}

function BreadcrumbNav({
  breadcrumbs,
}: {
  breadcrumbs: Array<{ href: string; label: string; isLast: boolean }>;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb) => (
          <React.Fragment key={breadcrumb.href}>
            <BreadcrumbItem className="hidden md:block">
              {breadcrumb.isLast ? (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!breadcrumb.isLast && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function ClientLayout({
  children,
  teamSlug,
  userId,
}: ClientTeamLayoutProps) {
  const pathname = usePathname();
  const breadcrumbs = useBreadcrumbs(pathname, teamSlug);
  const { isLoading, error, hasAccess } = useTeamAccess(userId, teamSlug);

  if (error) {
    return <div>Error loading teams: {error.message}</div>;
  }

  // Only show loading state during initial teams fetch
  if (isLoading && !useTeamStore.getState().teams.length) {
    return <Loading />;
  }

  if (!hasAccess) {
    return <Loading />;
  }

  return (
    <SidebarProvider>
      <AppSidebar teamSlug={teamSlug} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4 hidden md:block"
            />
            <BreadcrumbNav breadcrumbs={breadcrumbs} />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
