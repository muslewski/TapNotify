"use client";

import { NavMain } from "@/components/nav/sidebar/nav-main";
import { NavUser } from "@/components/nav/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import TeamSwitcher from "@/components/nav/sidebar/team-switcher";
import { sidebarData as data } from "@/data/sidebar-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  teamSlug: string;
}

export default function AppSidebar({ teamSlug, ...props }: AppSidebarProps) {
  const { open, setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      onClick={() => open === false && setOpen(true)}
      className="flex flex-col h-screen"
      {...props}
    >
      <SidebarHeader className="flex-shrink-0 relative">
        <Link
          href={`/app/${teamSlug}/dashboard`}
          className="group relative flex flex-row items-center gap-3 px-4 py-6 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-3 group-data-[collapsible=icon]:scale-75  transition-all duration-200 hover:bg-accent/5"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="flex-shrink-0"
          >
            <Image
              src="/tapnotify-logo.png"
              alt="TapNotify Logo"
              width={32}
              height={32}
              className="transition-transform"
            />
          </motion.div>

          <div className="flex flex-col space-y-0.5 group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-lg tracking-tight">
              TapNotify
            </span>
            <span className="text-xs font-medium text-muted-foreground/70">
              Workspace
            </span>
          </div>
        </Link>

        {/* Subtle divider */}
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-border/5 via-border/30 to-border/5" />
      </SidebarHeader>
      <SidebarContent className="h-full">
        <TeamSwitcher />
        <ScrollArea type="hover" className="flex-1 min-h-0">
          <NavMain navMain={data(teamSlug).navMain} />
        </ScrollArea>
        {/* <NavProjects projects={data(teamSlug).projects} /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
