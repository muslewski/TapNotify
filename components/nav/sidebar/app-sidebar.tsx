"use client";

import { NavMain } from "@/components/nav/sidebar/nav-main";
import { NavUser } from "@/components/nav/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  MessageSquare,
  Users,
  BarChart,
  Settings2,
  BookOpen,
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
      url: "/dashboard",
      icon: BarChart,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard/overview",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
      ],
    },
    {
      title: "Campaigns",
      url: "/campaigns",
      icon: MessageSquare,
      items: [
        {
          title: "Create Campaign",
          url: "/campaigns/create",
        },
        // {
        //   title: "Scheduled",
        //   url: "/campaigns/scheduled",
        // },
        {
          title: "All Campaigns",
          url: "/campaigns/create",
        },
        {
          title: "Message Templates",
          url: "/campaigns/templates",
        },
      ],
    },
    {
      title: "Contacts",
      url: "/contacts",
      icon: Users,
      items: [
        {
          title: "Add Contact",
          url: "/contacts/all",
        },
        {
          title: "All Contacts",
          url: "/contacts/all",
        },
        // {
        //   title: "Groups",
        //   url: "/contacts/groups",
        // },
        {
          title: "Import",
          url: "/contacts/import",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
      items: [
        {
          title: "Getting Started",
          url: "/docs/getting-started",
        },
        {
          title: "API Reference",
          url: "/docs/api",
        },
        {
          title: "Best Practices",
          url: "/docs/best-practices",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "Account",
          url: "/settings/account",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
        // {
        //   title: "Integrations",
        //   url: "/settings/integrations",
        // },
        {
          title: "API Keys",
          url: "/settings/api-keys",
        },
      ],
    },
  ],
  projects: [
    {
      name: "E-commerce Notifications",
      url: "/projects/ecommerce",
      icon: ShoppingBag,
    },
    {
      name: "Appointment Reminders",
      url: "/projects/appointments",
      icon: Smartphone,
    },
    {
      name: "Corporate Communications",
      url: "/projects/corporate",
      icon: Building,
    },
  ],
};

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link
          href="/dashboard"
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
