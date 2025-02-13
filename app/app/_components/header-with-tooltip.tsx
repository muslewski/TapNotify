"use client";

import { Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface HeaderWithTooltipProps {
  label: string;
  tooltipText: string;
  className?: string;
}

export const HeaderWithTooltip = ({
  label,
  tooltipText,
  className,
}: HeaderWithTooltipProps) => {
  return (
    <div className={cn("flex items-center space-x-2 group/tooltip", className)}>
      <span className="text-sm font-medium tracking-tight">{label}</span>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="relative inline-flex items-center justify-center p-1"
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 blur-sm"
                initial={false}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.span
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300"
                initial={false}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <Info className="h-4 w-4 text-blue-600 hover:text-indigo-600 transition-colors cursor-help relative z-10" />
            </motion.div>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={5}
            className="bg-gradient-to-br from-background to-background px-4 py-3 rounded-lg shadow-xl border border-gray-700/50"
          >
            <AnimatePresence>
              <motion.div
                className="space-y-1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="font-medium text-sm text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {label}
                </motion.div>
                <motion.p
                  className="text-sm font-normal text-muted-foreground max-w-[280px] leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {tooltipText}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
