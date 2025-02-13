"use client";

import { Button } from "@/components/ui/button";
import { User, Phone, Copy, Check, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Contact, User as PrismaUser } from "@prisma/client";
import { SmartCell } from "@/components/smart-cell";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HeaderWithTooltip } from "@/app/app/_components/header-with-tooltip";
import { PhoneNumberFormatter } from "@/app/app/_components/phone-number-formatter";

interface RecipientCellProps {
  recipient: Contact & { user: PrismaUser };
}

export const RecipientCell = ({ recipient }: RecipientCellProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const params = useParams();

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(recipient.phone);
      setIsCopied(true);
      toast.success("The phone number has been copied to your clipboard.");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Could not copy the phone number to clipboard.");
    }
  };

  return (
    <SmartCell
      icon={User}
      title={recipient.contactLabel || recipient.displayName || "Unknown"}
      preview={
        <div className="flex items-center gap-2">
          <Phone className="h-3 w-3" />
          <span className="truncate">
            <PhoneNumberFormatter phoneNumber={recipient.phone} />
          </span>
        </div>
      }
      dialogTitle="Recipient Details"
      dialogDescription="Contact information"
      dialogActions={
        <Button asChild size="sm" className="gap-2">
          <Link href={`/app/${params.teamSlug}/contacts/${recipient.id}`}>
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
        </Button>
      }
      dialogContent={
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground">
            <div className="mb-2">
              <HeaderWithTooltip
                label="Contact Label"
                tooltipText="Internal label used to identify the contact within your team. This is only visible to team members and helps with organization (e.g., 'John Doe - Pizza', 'Sarah - Marketing Lead')."
              />
            </div>
            <div className="mt-1 flex items-center gap-3">
              <User className="h-4 w-4 text-primary" />
              <span className="text-foreground">
                {recipient.contactLabel || "Not set"}
              </span>
            </div>
          </div>

          <div className="text-sm font-medium text-muted-foreground">
            <div className="mb-2">
              <HeaderWithTooltip
                label="Display Name"
                tooltipText="The name that will be shown to the recipient in messages and communications. This is how they will see themselves addressed (e.g., 'John', 'Ms. Smith')."
              />
            </div>
            <div className="mt-1 flex items-center gap-3">
              <User className="h-4 w-4 text-primary" />
              <span className="text-foreground">
                {recipient.displayName || "Not set"}
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Phone Number
            </label>
            <div className="mt-1 flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-foreground text-sm font-medium">
                <PhoneNumberFormatter phoneNumber={recipient.phone} />
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="ml-auto"
                onClick={copyToClipboard}
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      }
      createdAt={recipient.createdAt}
      creator={recipient.user}
    />
  );
};
