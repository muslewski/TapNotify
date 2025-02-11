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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  teamSlug: string;
}

export default function AppSidebar({ teamSlug, ...props }: AppSidebarProps) {
  const { open, setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      onClick={() => open === false && setOpen(true)}
      className=""
      {...props}
    >
      <SidebarHeader>
        <Link
          href={`/app/${teamSlug}/dashboard`}
          className="flex flex-row items-center gap-2 px-2 py-4"
        >
          <Image
            src="/tapnotify-logo.png"
            alt="TapNotify Logo"
            width={24}
            height={24}
          />
          <span className="font-bold group-data-[collapsible=icon]:hidden">
            TapNotify
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <TeamSwitcher />
        <NavMain navMain={data(teamSlug).navMain} />
        {/* <NavProjects projects={data(teamSlug).projects} /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
