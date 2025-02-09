"use client";

import { ContactColumn } from "@/app/app/[teamSlug]/contacts/_components/columns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirmModal } from "@/providers/confirm-modal-context";
import {
  CopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CellActionProps {
  data: ContactColumn;
}

export function CellAction({ data }: CellActionProps) {
  const { confirmModal } = useConfirmModal();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const handleCopy = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Phone number copied to clipboard.");
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const confirmed = await confirmModal({
        heading: "Delete Contact",
        description: "Are you sure you want to delete this contact?",
        confirmLabel: "Delete",
        confirmVariant: "destructive",
      });

      if (confirmed) {
        // Send request to delete an entity
        const response = await fetch(
          `/api/teams/${params.teamSlug}/contacts/${data.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Contact deleted successfully.");
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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open actions</span>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleCopy(data.phone)}>
            <CopyIcon className="size-4 mr-2" />
            Copy Phone Number
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/app/${params.teamSlug}/contacts/${data.id}`)
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
    </>
  );
}
