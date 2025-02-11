import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("space-y-4 p-8 pt-6 h-full flex flex-col", className)}>
      {children}
    </div>
  );
}
