"use client";

import { CustomFieldProps } from "@/types/entity-form";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { COUNTRIES } from "@/data/countries";

interface PhoneInputProps extends CustomFieldProps {
  customProps?: {
    defaultCountryCode?: string;
    initialValue?: string;
  };
}

export function PhoneInput({
  field,
  form,
  disabled,
  className,
  customProps = {},
}: PhoneInputProps) {
  // Find default country based on phone code and country code
  const getCountryByPhoneCode = useCallback(
    (phoneCode: string) => {
      // First try to find a direct match with the default country code
      if (customProps?.defaultCountryCode) {
        const defaultCountry = COUNTRIES.find(
          (c) => c.code === customProps.defaultCountryCode
        );
        if (defaultCountry) return defaultCountry;
      }

      // Then try to find by phone code
      return COUNTRIES.find((c) => c.phoneCode === phoneCode) || COUNTRIES[0];
    },
    [customProps?.defaultCountryCode]
  );

  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState(() =>
    getCountryByPhoneCode(customProps?.defaultCountryCode || "+48")
  );

  // Format phone number based on country
  const formatPhoneNumber = useCallback(
    (value: string, currentCountry: typeof country) => {
      const digits = value.replace(/\D/g, "");
      if (!digits) return "";

      // Use country's format if available, otherwise use generic grouping
      if (currentCountry.format) {
        return digits.replace(
          currentCountry.format.pattern,
          currentCountry.format.display
        );
      }

      // Generic grouping in threes
      return digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
    },
    []
  );

  const detectCountry = useCallback(
    (phone: string): typeof country => {
      if (!phone.startsWith("+")) return country;

      // Find all countries that match the phone code
      const matchingCountries = COUNTRIES.filter((c) =>
        phone.startsWith(c.phoneCode)
      );

      if (matchingCountries.length === 0) return country;
      if (matchingCountries.length === 1) return matchingCountries[0];

      // If multiple countries share the same code (like +1),
      // prefer the one matching defaultCountryCode if specified
      if (customProps?.defaultCountryCode) {
        const defaultMatch = matchingCountries.find(
          (c) => c.code === customProps.defaultCountryCode
        );
        if (defaultMatch) return defaultMatch;
      }

      // Otherwise return the first match
      return matchingCountries[0];
    },
    [country, customProps?.defaultCountryCode]
  );

  useEffect(() => {
    const value = field?.value || customProps?.initialValue || "";
    if (!value) return;

    const detectedCountry = detectCountry(value);
    setCountry(detectedCountry);

    const nationalNumber = value.slice(detectedCountry.phoneCode.length);
    setPhoneNumber(formatPhoneNumber(nationalNumber, detectedCountry));
  }, [
    field?.value,
    customProps?.initialValue,
    detectCountry,
    formatPhoneNumber,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Handle country code input
    if (value.startsWith("+")) {
      const newCountry = detectCountry(value);
      setCountry(newCountry);
      value = value.slice(newCountry.phoneCode.length);
    }

    // Format phone number
    const digits = value.replace(/\D/g, "");
    const formatted = formatPhoneNumber(digits, country);
    setPhoneNumber(formatted);

    // Update form with full number
    if (form?.setValue && field?.name) {
      form.setValue(field.name, `${country.phoneCode}${digits}`, {
        shouldValidate: true,
      });
    }
  };

  return (
    <div className="relative">
      <input
        type="tel"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={phoneNumber ? `${country.phoneCode} ${phoneNumber}` : ""}
        onChange={handleChange}
        disabled={disabled}
        placeholder={`${country.phoneCode} ${country.placeholderPhone}`}
      />
    </div>
  );
}
