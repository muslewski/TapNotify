"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils"; // Adjust the import path as necessary
import { Team } from "@prisma/client";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useTeamStore } from "@/store/use-team-store";
import { useTeamNavigation } from "@/hooks/use-team-navigation";

export default function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const currentUser = useCurrentUser();
  const { navigateToTeam, router } = useTeamNavigation();

  // Zustand state and actions
  const {
    teams,
    activeTeam,
    isInitialLoading,
    isSwitching,
    error,
    fetchTeams,
    setActiveTeam,
    setSwitching,
    getActiveTeamSlug,
  } = useTeamStore();

  // Initial fetch
  useEffect(() => {
    const initializeTeams = async () => {
      if (!currentUser?.id) return;

      try {
        const data = await fetchTeams(currentUser.id);

        const currentSlug = getActiveTeamSlug();
        const initialTeam = currentSlug
          ? data.find((team) => team.slug === currentSlug)
          : data[0];

        if (initialTeam) {
          setActiveTeam(initialTeam);

          if (!currentSlug && data.length > 0) {
            navigateToTeam(data[0]);
          }
        }
      } catch (err) {
        console.error("Failed to initialize teams:", err);
      }
    };

    initializeTeams();
  }, [
    currentUser?.id,
    fetchTeams,
    getActiveTeamSlug,
    navigateToTeam,
    setActiveTeam,
  ]);

  // Update active team based on URL
  useEffect(() => {
    const currentSlug = getActiveTeamSlug();
    if (currentSlug && teams.length > 0) {
      const teamFromUrl = teams.find((team) => team.slug === currentSlug);
      if (teamFromUrl && teamFromUrl.id !== activeTeam?.id) {
        setActiveTeam(teamFromUrl);
      }
    }
  }, [getActiveTeamSlug, teams, activeTeam?.id, setActiveTeam]);

  // Handle team switch
  const handleTeamSwitch = async (team: Team) => {
    setSwitching(true);
    setActiveTeam(team);
    navigateToTeam(team);
    setSwitching(false);
  };

  if (isInitialLoading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Team</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuButton size="lg">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading teams...
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  if (error) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Team</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuButton size="lg">Error: {error}</SidebarMenuButton>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Team</SidebarGroupLabel>
      <SidebarMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {activeTeam ? (
                <>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden  text-sidebar-primary-foreground">
                    <Image
                      src={activeTeam.logoUrl || "/fallbacks/user.png"}
                      alt={activeTeam.name}
                      width={32}
                      height={32}
                      className="h-full w-auto object-cover"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeTeam.name}
                    </span>
                    {isSwitching && (
                      <span className="text-xs text-muted-foreground">
                        Switching...
                      </span>
                    )}
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </>
              ) : (
                <span>No teams available</span>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Available Teams
            </DropdownMenuLabel>
            {teams.map((team) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => handleTeamSwitch(team)}
                className={cn(
                  "gap-2 p-2",
                  activeTeam?.id === team.id && " bg-gray-700/5"
                )}
              >
                <div className="flex size-6 items-center justify-center rounded-sm overflow-hidden">
                  <Image
                    src={team.logoUrl || "/fallbacks/user.png"}
                    alt={team.name}
                    width={24}
                    height={24}
                    className="h-full w-auto object-cover"
                  />
                </div>
                {team.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => router.push("/app/create-team")}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenu>
    </SidebarGroup>
  );
}
