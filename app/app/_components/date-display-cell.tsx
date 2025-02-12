import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils"; // assuming you have shadcn's utility function
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // from shadcn

interface DateDisplayCellProps {
  date: Date;
  className?: string;
}

export function DateDisplayCell({ date, className }: DateDisplayCellProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format dates
  const simpleDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);

  const detailedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <motion.div
            className={cn(
              "flex items-center gap-2 cursor-pointer select-none",
              "rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800",
              className
            )}
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar className="h-4 w-4 text-gray-500" />
            <AnimatePresence mode="wait">
              <motion.span
                key={isExpanded ? "detailed" : "simple"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="text-sm"
              >
                {isExpanded ? detailedDate : simpleDate}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to {isExpanded ? "collapse" : "expand"} date</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
