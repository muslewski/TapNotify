"use client";

import { cn } from "@/lib/utils";
import { COUNTRIES } from "@/data/countries";
import { useMemo } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface PhoneNumberCellProps {
  phoneNumber: string;
  className?: string;
}

export function PhoneNumberCell({
  phoneNumber,
  className,
}: PhoneNumberCellProps) {
  const { formattedNumber, country } = useMemo(() => {
    if (!phoneNumber) {
      return { formattedNumber: "", country: null };
    }

    // Find the country based on the phone code
    const country =
      COUNTRIES.find((c) => phoneNumber.startsWith(c.phoneCode)) || null;

    if (!country) {
      return { formattedNumber: phoneNumber, country: null };
    }

    // Extract the national number (remove country code)
    const nationalNumber = phoneNumber
      .slice(country.phoneCode.length)
      .replace(/\D/g, "");

    // Format the number according to country's format
    let formattedNationalNumber = nationalNumber;
    if (country.format) {
      formattedNationalNumber = nationalNumber.replace(
        country.format.pattern,
        country.format.display
      );
    } else {
      // Fallback formatting in groups of three
      formattedNationalNumber = nationalNumber
        .replace(/(\d{3})(?=\d)/g, "$1 ")
        .trim();
    }

    const formattedNumber = `${country.phoneCode} ${formattedNationalNumber}`;
    return { formattedNumber, country };
  }, [phoneNumber]);

  if (!phoneNumber) {
    return (
      <span className={cn("text-muted-foreground italic", className)}>
        No phone number
      </span>
    );
  }

  const handleClick = () => {
    navigator.clipboard.writeText(phoneNumber);
    toast.success("Phone number copied to clipboard");
  };

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 px-2 hover:bg-muted",
              "flex items-center gap-2 w-fit",
              className
            )}
            onClick={handleClick}
          >
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium tracking-wide">{formattedNumber}</span>
            {country && (
              <span className="text-xs text-muted-foreground">
                ({country.name})
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to copy phone number</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
