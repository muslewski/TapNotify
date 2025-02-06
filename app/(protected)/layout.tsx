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
import { usePathname } from "next/navigation";
import React from "react";

// Define your route configuration
const routeConfig: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/dashboard/analytics": "Dashboard Analytics",
  "/app/settings": "Settings",
  // Add more routes as needed
};

const getBreadcrumbs = (pathname: string) => {
  // Split the pathname into an array of paths, removing any empty strings
  const paths = pathname.split("/").filter(Boolean);

  // Map over the paths array to create breadcrumb objects
  return paths.map((path, index) => {
    // Create the href for the breadcrumb by joining the paths up to the current index
    const href = "/" + paths.slice(0, index + 1).join("/");

    // Return the breadcrumb object
    return {
      href,
      label: routeConfig[href] || path.charAt(0).toUpperCase() + path.slice(1),
      isLast: index === paths.length - 1,
    };
  });
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb) => (
                  <React.Fragment key={breadcrumb.href}>
                    <BreadcrumbItem className="hidden md:block">
                      {breadcrumb.isLast ? (
                        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={breadcrumb.href}>
                          {breadcrumb.label}
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
