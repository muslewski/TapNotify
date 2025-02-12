"use client";

import { CampaignMessagesColumn } from "@/app/app/[teamSlug]/campaigns/[campaignId]/messages/_components/columns";
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
  Undo2,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CellActionProps {
  data: CampaignMessagesColumn;
}

export function CellAction({ data }: CellActionProps) {
  const { confirmModal } = useConfirmModal();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const sendSingleMessage = async () => {
    try {
      setLoading(true);
      const confirmed = await confirmModal({
        heading: "Send Message",
        description: "Are you sure you want to send this message to recipient?",
        confirmLabel: "Send",
        confirmVariant: "default",
      });

      if (confirmed) {
        // Send request to send campaign
        const response = await fetch(
          `/api/teams/${params.teamSlug}/campaigns/${params.campaignId}/messages/${data.id}/send`,
          {
            method: "POST",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        toast.success("Message sent successfully.");
        router.refresh(); // Refresh the page to reflect changes
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to sent message.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const confirmed = await confirmModal({
        heading: "Delete Message",
        description:
          "Are you sure you want to delete this message and contact from campaign?",
        confirmLabel: "Delete",
        confirmVariant: "destructive",
      });

      if (confirmed) {
        // Send request to delete an entity
        const response = await fetch(
          `/api/teams/${params.teamSlug}/campaigns/${params.campaignId}/messages/${data.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Message deleted successfully.");
        } else {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete message.");
    } finally {
      setLoading(false);
      router.refresh(); // Refresh the page to reflect changes
    }
  };

  const handleReopen = async () => {
    try {
      setLoading(true);
      const confirmed = await confirmModal({
        heading: "Reopen Message",
        description:
          "This will move your message back to the draft state, allowing you to edit and resend it. Are you sure?",
        confirmLabel: "Reopen",
        confirmVariant: "default",
      });

      if (confirmed) {
        const response = await fetch(
          `/api/teams/${params.teamSlug}/campaigns/${params.campaignId}/messages/${data.id}/reopen`,
          {
            method: "POST",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        toast.success("Message reopened successfully.");
        router.refresh(); // Refresh the page to reflect changes
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to reopen message.");
    } finally {
      setLoading(false);
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
              onClick={sendSingleMessage}
              disabled={loading || data.status !== "DRAFT"}
            >
              <SendIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send Message</p>
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
          {data.status === "FAILED" || data.status === "SENT" ? (
            // Add re-open option for failed and sent messages
            <DropdownMenuItem onClick={handleReopen} disabled={loading}>
              <Undo2 className="size-4 mr-2" />
              Reopen
            </DropdownMenuItem>
          ) : null}

          {data.status === "FAILED" || data.status === "SENT" ? null : (
            <DropdownMenuItem
              onClick={
                () =>
                  router.push(
                    `/app/${params.teamSlug}/campaigns/${params.campaignId}/messages/${data.id}`
                  ) // Redirect to edit page
              }
            >
              <EditIcon className="size-4 mr-2" />
              Edit
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleDelete} disabled={loading}>
            <TrashIcon className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
