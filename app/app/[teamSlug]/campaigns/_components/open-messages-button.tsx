"use client";

import { CampaignColumn } from "@/app/app/[teamSlug]/campaigns/_components/columns";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

interface OpenMessagesProps {
  contactLength: number;
  data: CampaignColumn;
}

export default function OpenMessagesButton({
  contactLength,
  data,
}: OpenMessagesProps) {
  const params = useParams();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/app/${params.teamSlug}/campaigns/${data.id}/messages`}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-3 py-2 transition-all hover:bg-secondary"
              >
                <MessagesSquare className="h-4 w-4" />
                <span className="font-medium">{contactLength}</span>
                <span className="text-muted-foreground">Messages</span>
              </Button>
            </motion.div>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to manage messages and contacts</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
