"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES } from "@/data/countries";
import { Control } from "react-hook-form";

interface CountryCodeFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  disabled?: boolean;
}

export function CountryCodeField({
  control,
  disabled = false,
}: CountryCodeFieldProps) {
  return (
    <FormField
      control={control}
      name="defaultCountryCode"
      render={({ field }) => (
        <FormItem className="max-w-72">
          <FormLabel className="text-base">Country Code</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select a country">
                  {field.value && (
                    <div className="flex items-center gap-2">
                      {COUNTRIES.find((c) => c.code === field.value)?.flag}{" "}
                      {COUNTRIES.find((c) => c.code === field.value)?.phoneCode}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem
                  key={country.code}
                  value={country.code}
                  className="flex items-center gap-2"
                >
                  <span className="mr-2">{country.flag}</span>
                  <span>
                    {country.name}{" "}
                    <span className="text-muted-foreground">
                      ({country.phoneCode})
                    </span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            It will be used to format phone numbers.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
