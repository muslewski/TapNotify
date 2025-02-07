"use client";

import logout from "@/actions/auth/logout";
import { ThemeSwitcher } from "@/components/nav/theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { reloadSession } from "@/lib/reload-session";
import { useTeamStore } from "@/store/use-team-store";
import {
  BadgeCheckIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  HouseIcon,
  LogOutIcon,
  PanelTopIcon,
  SparklesIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NavUser() {
  const user = useCurrentUser();
  const { update } = useSession();
  const { isMobile } = useSidebar();
  const { fetchTeams, getActiveTeamSlug } = useTeamStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Function to get the base URL with team slug
  const getBaseUrl = async () => {
    // First try to get the active team slug from the store
    let teamSlug = getActiveTeamSlug();

    // If no team slug is available, try to fetch teams
    if (!teamSlug && user?.id) {
      await fetchTeams(user.id);
      teamSlug = getActiveTeamSlug();
    }

    return teamSlug ? `/app/${teamSlug}` : "/app";
  };

  // Handle navigation with proper team context
  const handleNavigation = async (path: string) => {
    try {
      setIsLoading(true);
      const baseUrl = await getBaseUrl();
      router.push(`${baseUrl}${path}`);
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !user.id) {
    return (
      <Button variant="outline" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    );
  }

  const handleLogout = () => {
    logout();
    update();
    reloadSession();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={user.image || "/fallbacks/user.png"}
              alt={user.name || "User Profile Image"}
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
          <ChevronsUpDownIcon className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align={isMobile ? "end" : "start"}
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={user.image || "/fallbacks/user.png"}
                alt={user.name || "User Profile Image"}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SparklesIcon />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => handleNavigation("/dashboard")}
          >
            <HouseIcon />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => handleNavigation("/settings/account")}
          >
            <BadgeCheckIcon />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => handleNavigation("/settings/account/billing")}
          >
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/">
              <PanelTopIcon />
              Website
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <ThemeSwitcher showLabel />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
