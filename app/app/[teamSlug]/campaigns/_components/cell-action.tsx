"use client";

import { CampaignColumn } from "@/app/app/[teamSlug]/campaigns/_components/columns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConfirmModal } from "@/providers/confirm-modal-context";
import {
  EditIcon,
  MoreHorizontalIcon,
  SendIcon,
  TrashIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CellActionProps {
  data: CampaignColumn;
}

export function CellAction({ data }: CellActionProps) {
  const { confirmModal } = useConfirmModal();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const startCampaign = async () => {
    try {
      setLoading(true);
      const confirmed = await confirmModal({
        heading: "Start Campaign",
        description:
          "Are you sure you want to start this campaign? This will send messages to all contacts included in this campaign.",
        confirmLabel: "Start",
        confirmVariant: "default",
      });

      if (confirmed) {
        // For now just console log, but this is where you would add the API call
        console.log("Starting");
        toast.success("Campaign started successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to start campaign.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const confirmed = await confirmModal({
        heading: "Delete Campaign",
        description: "Are you sure you want to delete this campaign?",
        confirmLabel: "Delete",
        confirmVariant: "destructive",
      });

      if (confirmed) {
        // Send request to delete an entity
        const response = await fetch(
          `/api/teams/${params.teamSlug}/campaigns/${data.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Campaign deleted successfully.");
        } else {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete contact.");
    } finally {
      setLoading(false);
      router.refresh(); // Refresh the page to reflect changes
    }
  };

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider delayDuration={50}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="size-8 p-0"
              onClick={startCampaign}
              disabled={loading}
            >
              <SendIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Start Campaign</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open actions</span>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/app/${params.teamSlug}/campaigns/${data.id}`)
            }
          >
            <EditIcon className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} disabled={loading}>
            <TrashIcon className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
