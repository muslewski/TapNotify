import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface SortButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: any;
  label: string;
}

export default function SortButton({ column, label }: SortButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
