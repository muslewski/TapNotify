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
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { sidebarData } from "@/data/sidebar-data";

/**
 * Generates breadcrumb navigation based on the current pathname and team slug.
 *
 * @param {string} pathname - The current URL path (e.g., "/teamSlug/dashboard/overview").
 * @param {string} teamSlug - The unique identifier for the team.
 * @returns {Array<{ href: string; label: string; isLast: boolean }>}
 *          An array of breadcrumb objects containing:
 *          - `href`: The breadcrumb link.
 *          - `label`: The display title of the breadcrumb.
 *          - `isLast`: A boolean indicating if it's the last breadcrumb in the path.
 */
const getBreadcrumbs = (pathname: string, teamSlug: string) => {
  // Retrieve the navigation structure for the given team
  const navData = sidebarData(teamSlug).navMain;

  // Split the pathname into an array of segments, removing empty strings
  const paths = pathname.split("/").filter(Boolean);

  // Initialize an array to store breadcrumb items
  const breadcrumbs = [];

  let currentPath = "";

  // Iterate through each segment of the path to build breadcrumbs
  for (const path of paths) {
    currentPath += `/${path}`;

    // Find a matching navigation item (either main or sub-item)
    const navItem =
      navData.find((item) => item.url === currentPath) ||
      navData
        .flatMap((item) => item.items)
        .find((subItem) => subItem?.url === currentPath);

    if (navItem) {
      breadcrumbs.push({
        href: navItem.url, // The breadcrumb link
        label: navItem.title, // Display text for the breadcrumb
        isLast: currentPath === pathname, // True if it's the last breadcrumb
      });
    }
  }

  return breadcrumbs;
};

export default function ClientLayout({
  children,
  teamSlug,
}: {
  children: React.ReactNode;
  teamSlug: string;
}) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname, teamSlug);

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
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
