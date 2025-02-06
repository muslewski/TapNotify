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

import {
  MessageSquare,
  Users,
  BarChart,
  Settings2,
  Smartphone,
  Building,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/app/dashboard",
      icon: BarChart,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/app/dashboard",
        },
        {
          title: "Analytics",
          url: "/app/dashboard/analytics",
        },
      ],
    },
    {
      title: "Campaigns",
      url: "/app/campaigns",
      icon: MessageSquare,
      isActive: true,
      items: [
        {
          title: "All Campaigns",
          url: "/app/campaigns",
        },
        {
          title: "Create Campaign",
          url: "/app/campaigns/create",
        },
        // {
        //   title: "Scheduled",
        //   url: "/campaigns/scheduled",
        // },
        {
          title: "Message Templates",
          url: "/app/campaigns/message-templates",
        },
      ],
    },
    {
      title: "Contacts",
      url: "/app/contacts",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "All Contacts",
          url: "/app/contacts",
        },
        {
          title: "Add Contact",
          url: "/app/contacts/add",
        },
        // {
        //   title: "Groups",
        //   url: "/contacts/groups",
        // },
        // {
        //   title: "Import",
        //   url: "/app/contacts/import",
        // },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "/docs",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Getting Started",
    //       url: "/docs/getting-started",
    //     },
    //     {
    //       title: "API Reference",
    //       url: "/docs/api",
    //     },
    //     {
    //       title: "Best Practices",
    //       url: "/docs/best-practices",
    //     },
    //   ],
    // },
    {
      title: "Settings",
      url: "/app/settings",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "Account",
          url: "/app/settings",
        },
        {
          title: "Billing",
          url: "/app/settings/billing",
        },
        // {
        //   title: "Integrations",
        //   url: "/settings/integrations",
        // },
        // {
        //   title: "API Keys",
        //   url: "/app/settings/api-keys",
        // },
      ],
    },
  ],
  projects: [
    {
      name: "E-commerce Notifications",
      url: "/app/projects/ecommerce",
      icon: ShoppingBag,
    },
    {
      name: "Appointment Reminders",
      url: "/app/projects/appointments",
      icon: Smartphone,
    },
    {
      name: "Corporate Communications",
      url: "/app/projects/corporate",
      icon: Building,
    },
  ],
};

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { open, setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      onClick={() => open === false && setOpen(true)}
      {...props}
    >
      <SidebarHeader>
        <Link
          href="/app/dashboard"
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
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
