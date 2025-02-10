import {
  CheckCircle,
  Clock,
  AlertCircle,
  PenLine,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CampaignStatus, MessageStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

// Base types and interfaces
type BaseStatus = string;

interface StatusStyles {
  default: string;
  draft: string;
  pending: string;
  success: string;
  error: string;
  info: string;
}

interface StatusBadgeProps<T extends BaseStatus> {
  status: T;
  type: "message" | "campaign"; // Add more types here as needed
  className?: string;
  showPrefix?: boolean;
}

// Styles configuration
const statusStyles: StatusStyles = {
  default: "bg-slate-100 text-slate-700 hover:bg-slate-200",
  draft: "bg-slate-100 text-slate-700 hover:bg-slate-200",
  pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  success: "bg-green-100 text-green-700 hover:bg-green-200",
  error: "bg-red-100 text-red-700 hover:bg-red-200",
  info: "bg-blue-100 text-blue-700 hover:bg-blue-200",
};

// Status configurations
const STATUS_CONFIGS = {
  message: {
    [MessageStatus.DRAFT]: {
      icon: PenLine,
      label: "Draft",
      className: statusStyles.draft,
    },
    [MessageStatus.PENDING]: {
      icon: Clock,
      label: "Pending",
      className: statusStyles.pending,
    },
    [MessageStatus.SENT]: {
      icon: CheckCircle,
      label: "Sent",
      className: statusStyles.success,
    },
    [MessageStatus.FAILED]: {
      icon: AlertCircle,
      label: "Failed",
      className: statusStyles.error,
    },
  },
  campaign: {
    [CampaignStatus.DRAFT]: {
      icon: PenLine,
      label: "Draft",
      className: statusStyles.draft,
    },
    [CampaignStatus.SCHEDULED]: {
      icon: Calendar,
      label: "Scheduled",
      className: statusStyles.info,
    },
    [CampaignStatus.COMPLETED]: {
      icon: CheckCircle,
      label: "Completed",
      className: statusStyles.success,
    },
    [CampaignStatus.FAILED]: {
      icon: AlertCircle,
      label: "Failed",
      className: statusStyles.error,
    },
  },
} as const;

export const StatusBadge = <T extends BaseStatus>({
  status,
  type,
  className,
  showPrefix = false,
}: StatusBadgeProps<T>) => {
  const config =
    STATUS_CONFIGS[type][status as keyof (typeof STATUS_CONFIGS)[typeof type]];

  if (!config) {
    console.warn(
      `No configuration found for status: ${status} of type: ${type}`
    );
    return null;
  }

  const Icon = config.icon;
  const label = showPrefix ? `${type} ${config.label}` : config.label;

  return (
    <Badge
      variant="secondary"
      className={cn(
        "flex items-center gap-1 px-2 py-1 font-medium w-fit",
        config.className,
        className
      )}
    >
      <Icon size={14} />
      <span>{label}</span>
    </Badge>
  );
};

// Type exports for convenience
export type { StatusBadgeProps };
