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
import Loading from "@/components/loading";
import { sidebarData } from "@/data/sidebar-data";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

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

// Helper function to check if a path segment matches a dynamic pattern
function isPathMatchingDynamicPattern(
  pathSegment: string,
  patternSegment: string
): boolean {
  // Check if the pattern segment starts with : (indicating a parameter)
  return patternSegment.startsWith(":") || pathSegment === patternSegment;
}

// Helper function to match URL patterns
function matchUrlPattern(currentPath: string, pattern: string): boolean {
  const currentSegments = currentPath.split("/").filter(Boolean);
  const patternSegments = pattern.split("/").filter(Boolean);

  if (currentSegments.length !== patternSegments.length) return false;

  return currentSegments.every((segment, index) =>
    isPathMatchingDynamicPattern(segment, patternSegments[index])
  );
}

// In your useBreadcrumbs hook, modify the dynamic route handling:
function useBreadcrumbs(pathname: string, teamSlug: string) {
  return React.useMemo(() => {
    const navData = sidebarData(teamSlug).navMain;
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];
    let currentPath = "";

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      currentPath += `/${path}`;

      // First try to find exact match
      let navItem = navData.find((item) => item.url === currentPath);

      if (!navItem) {
        // Then check main nav items with dynamic routes
        navItem = navData.find((item) =>
          matchUrlPattern(currentPath, item.url)
        );
      }

      if (!navItem) {
        // Check subitems, including dynamic routes
        const subItem = navData
          .flatMap((item) => item.items || [])
          .find((subItem) => {
            if (!subItem) return false;
            if (subItem.dynamic) {
              return matchUrlPattern(currentPath, subItem.url);
            }
            return subItem.url === currentPath;
          });

        if (subItem) {
          breadcrumbs.push({
            href: currentPath, // Use the actual path instead of the pattern
            label: subItem.title,
            isLast: currentPath === pathname,
            isDynamic: subItem.dynamic,
          });
          continue;
        }
      }

      if (navItem) {
        breadcrumbs.push({
          href: currentPath, // Use the actual path instead of the pattern
          label: navItem.title,
          isLast: currentPath === pathname,
          isDynamic: false,
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
        <AnimatePresence mode="wait" initial={false}>
          {breadcrumbs.map((breadcrumb, index) => (
            <motion.div
              key={breadcrumb.href}
              initial={{ x: 50, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.25,
                  delay: index * 0.08,
                  ease: [0.32, 0.72, 0, 1], // Custom easing for smoother motion
                },
              }}
              exit={{
                x: 30,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: [0.32, 0, 0.67, 0],
                },
              }}
              className="flex items-center"
            >
              <BreadcrumbItem className="hidden md:block">
                {breadcrumb.isLast ? (
                  <BreadcrumbPage className="font-medium text-foreground/90 transition-opacity duration-200">
                    {breadcrumb.label}
                  </BreadcrumbPage>
                ) : (
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.15, ease: "easeOut" },
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { duration: 0.1 },
                    }}
                  >
                    <BreadcrumbLink asChild>
                      <Link
                        href={breadcrumb.href}
                        className="text-muted-foreground/75 hover:text-foreground/90 transition-all duration-200"
                      >
                        {breadcrumb.label}
                      </Link>
                    </BreadcrumbLink>
                  </motion.div>
                )}
              </BreadcrumbItem>

              {!breadcrumb.isLast && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.2,
                      delay: index * 0.08 + 0.08,
                      ease: "easeOut",
                    },
                  }}
                  className="ml-2 mr-1"
                >
                  <BreadcrumbSeparator className="hidden md:block text-muted-foreground/30 transition-opacity duration-200">
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
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
      <SidebarInset className="sm:h-screen">
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
        <main
          className="flex flex-1 flex-col gap-4 p-4 pt-0  "
          style={{ minHeight: "calc(100vh - 4rem)" }}
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
