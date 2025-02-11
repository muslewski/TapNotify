import {
  MessageSquare,
  Users,
  BarChart,
  Settings2,
  Smartphone,
  Building,
  ShoppingBag,
  type LucideIcon,
  Send,
} from "lucide-react";

export interface navMainProps {
  navMain: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      /** Hide item from sidebar */
      hidden?: boolean;
      /** Dynamic item for breadcrumb */
      dynamic?: boolean;
      underDevelopment?: boolean;
    }[];
  }[];
}

export interface SidebarDataInterface extends navMainProps {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export const sidebarData = (teamSlug: string): SidebarDataInterface => ({
  navMain: [
    {
      title: "Dashboard",
      url: `/app/${teamSlug}/dashboard`,
      icon: BarChart,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: `/app/${teamSlug}/dashboard`,
        },
        {
          title: "Analytics",
          url: `/app/${teamSlug}/dashboard/analytics`,
          underDevelopment: true,
        },
      ],
    },
    {
      title: "Campaigns",
      url: `/app/${teamSlug}/campaigns`,
      icon: Send,
      isActive: true,
      items: [
        {
          title: "All Campaigns",
          url: `/app/${teamSlug}/campaigns`,
        },
        {
          title: "Add Campaign",
          url: `/app/${teamSlug}/campaigns/add`,
        },
        {
          title: "Edit Campaign",
          url: `/app/${teamSlug}/campaigns/{{dynamic}}`,
          hidden: true,
          dynamic: true,
        },
        {
          title: "Schedule",
          url: `/app/${teamSlug}/campaigns/schedule`,
          underDevelopment: true,
        },
      ],
    },
    {
      title: "Message Templates",
      url: `/app/${teamSlug}/message-templates`,
      icon: MessageSquare,
      isActive: true,
      items: [
        {
          title: "All Templates",
          url: `/app/${teamSlug}/message-templates`,
        },
        {
          title: "Add Template",
          url: `/app/${teamSlug}/message-templates/add`,
        },
        {
          title: "Edit Template",
          url: `/app/${teamSlug}/message-templates/{{dynamic}}`,
          hidden: true,
          dynamic: true,
        },
      ],
    },
    {
      title: "Contacts",
      url: `/app/${teamSlug}/contacts`,
      icon: Users,
      isActive: true,
      items: [
        {
          title: "All Contacts",
          url: `/app/${teamSlug}/contacts`,
        },
        {
          title: "Add Contact",
          url: `/app/${teamSlug}/contacts/add`,
        },
        {
          title: "Edit Contact",
          url: `/app/${teamSlug}/contacts/{{dynamic}}`,
          hidden: true,
          dynamic: true,
        },
        // {
        //   title: "Groups",
        //   url: `/app/${teamSlug}/contacts/groups`,
        // },
        {
          title: "Import",
          url: `/app/${teamSlug}/contacts/import`,
          underDevelopment: true,
        },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: `/app/${teamSlug}/docs`,
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Getting Started",
    //       url: `/app/${teamSlug}/docs/getting-started`,
    //     },
    //     {
    //       title: "API Reference",
    //       url: `/app/${teamSlug}/docs/api`,
    //     },
    //     {
    //       title: "Best Practices",
    //       url: `/app/${teamSlug}/docs/best-practices`,
    //     },
    //   ],
    // },
    {
      title: "Settings",
      url: `/app/${teamSlug}/settings`,
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "Team Settings",
          url: `/app/${teamSlug}/settings`,
        },
        {
          title: "Account",
          url: `/app/${teamSlug}/settings/account`,
          underDevelopment: true,
        },
        {
          title: "Billing",
          url: `/app/${teamSlug}/settings/account/billing`,
          hidden: true,
        },
        // {
        //   title: "Integrations",
        //   url: `/app/${teamSlug}/settings/integrations`,
        // },
        {
          title: "API Keys",
          url: `/app/${teamSlug}/settings/api-keys`,
          underDevelopment: true,
        },
      ],
    },
  ],
  projects: [
    {
      name: "E-commerce Notifications",
      url: `/app/${teamSlug}/projects/ecommerce`,
      icon: ShoppingBag,
    },
    {
      name: "Appointment Reminders",
      url: `/app/${teamSlug}/projects/appointments`,
      icon: Smartphone,
    },
    {
      name: "Corporate Communications",
      url: `/app/${teamSlug}/projects/corporate`,
      icon: Building,
    },
  ],
});
