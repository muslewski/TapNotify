import { SidebarGroupLabel } from "@/components/ui/sidebar";

export default function CustomSidebarGroupLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarGroupLabel className="py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
      {children}
    </SidebarGroupLabel>
  );
}
