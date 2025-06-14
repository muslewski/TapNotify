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
import { useEffect, useRef } from "react";

interface OpenMessagesProps {
  contactLength: number;
  data: CampaignColumn;
}

export default function OpenMessagesButton({
  contactLength,
  data,
}: OpenMessagesProps) {
  const params = useParams();
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Add ref to store interval ID

  // Calculate the counts and percentages for each status
  const statusCounts =
    data.messages?.reduce(
      (acc, message) => {
        const status = message.status?.toLowerCase() || "draft";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  const total =
    Object.values(statusCounts).reduce((sum, count) => sum + count, 0) || 1;

  const percentages = {
    sent: ((statusCounts.sent || 0) / total) * 100,
    failed: ((statusCounts.failed || 0) / total) * 100,
    draft:
      (((statusCounts.draft || 0) +
        Object.entries(statusCounts)
          .filter(([key]) => !["sent", "failed"].includes(key))
          .reduce((sum, [, count]) => sum + count, 0)) /
        total) *
      100,
  };

  // Add useEffect to monitor pending messages
  useEffect(() => {
    const pendingCount = statusCounts.pending || 0;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // If there are pending messages, start logging
    if (pendingCount > 0) {
      console.log(
        `Started monitoring ${pendingCount} pending messages for campaign ${data.id}`
      );

      // Set up interval to log every 5 seconds
      intervalRef.current = setInterval(() => {
        console.log(
          `Still waiting on ${pendingCount} pending messages for campaign ${data.id}`
        );
      }, 5000);
    }

    // Clean up interval on unmount or when pendingCount changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        if (pendingCount > 0) {
          console.log("Stopped monitoring pending messages");
        }
      }
    };
  }, [statusCounts.pending, data.id]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/app/${params.teamSlug}/campaigns/${data.id}/messages`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col gap-1"
            >
              <Button
                variant="outline"
                className="flex items-center gap-2 px-3 py-2 transition-all hover:bg-secondary"
              >
                <MessagesSquare className="h-4 w-4" />
                <span className="font-medium">{contactLength}</span>
                <span className="text-muted-foreground">Messages</span>
              </Button>

              {/* Progress Bar */}
              <div className="h-1 w-full flex rounded-full overflow-hidden">
                {/* if  */}
                {statusCounts.pending > 0 ? (
                  <div
                    className="bg-yellow-500 animate-pulse"
                    style={{
                      width: `${(statusCounts.pending / total) * 100}%`,
                    }}
                  />
                ) : (
                  <>
                    {/* Sent Messages (Green) */}
                    {percentages.sent > 0 && (
                      <div
                        className="bg-green-500"
                        style={{ width: `${percentages.sent}%` }}
                      />
                    )}
                    {/* Failed Messages (Red) */}
                    {percentages.failed > 0 && (
                      <div
                        className="bg-red-500"
                        style={{ width: `${percentages.failed}%` }}
                      />
                    )}
                    {/* Draft and Other Messages (Gray) */}
                    {percentages.draft > 0 && (
                      <div
                        className="bg-gray-300"
                        style={{ width: `${percentages.draft}%` }}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Status Legend */}
              <div className="flex justify-between text-xs text-muted-foreground px-1">
                {statusCounts.pending > 0 ? (
                  <span className="animate-pulse w-full text-center">
                    {statusCounts.pending || 0} pending
                  </span>
                ) : (
                  <>
                    <span>{statusCounts.sent || 0} sent</span>
                    <span>{statusCounts.failed || 0} failed</span>
                    <span>
                      {(statusCounts.draft || 0) +
                        Object.entries(statusCounts)
                          .filter(
                            ([key]) =>
                              !["sent", "failed", "draft"].includes(key)
                          )
                          .reduce((sum, [, count]) => sum + count, 0)}{" "}
                      draft
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to view messages and contacts</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
