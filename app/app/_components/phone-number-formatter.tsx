"use client";

import { cn } from "@/lib/utils";
import { COUNTRIES } from "@/data/countries";
import { useMemo } from "react";

interface PhoneNumberFormatterProps {
  phoneNumber: string;
  className?: string;
}

export function PhoneNumberFormatter({
  phoneNumber,
  className,
}: PhoneNumberFormatterProps) {
  const { formattedNumber } = useMemo(() => {
    if (!phoneNumber) {
      return { formattedNumber: "" };
    }

    // Find the country based on the phone code
    const country =
      COUNTRIES.find((c) => phoneNumber.startsWith(c.phoneCode)) || null;

    if (!country) {
      return { formattedNumber: phoneNumber };
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
    return { formattedNumber };
  }, [phoneNumber]);

  if (!phoneNumber) {
    return (
      <span className={cn("text-muted-foreground italic", className)}>
        No phone number
      </span>
    );
  }

  return (
    <span className={cn("tracking-wide", className)}>{formattedNumber}</span>
  );
}
