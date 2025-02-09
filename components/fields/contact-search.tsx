"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CustomFieldProps } from "@/types";
import { PhoneNumber } from "@prisma/client";

export function ContactSearchField({
  field,
  form,
  disabled,
}: // customProps,
CustomFieldProps) {
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState<PhoneNumber[]>([]);

  const searchContacts = async (search: string) => {
    try {
      const response = await fetch(`/api/contacts/search?q=${search}`);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Failed to search contacts:", error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between"
        >
          {field.value
            ? contacts.find((contact) => contact.id === field.value)?.name
            : "Select contact..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder="Search contacts..."
            onValueChange={searchContacts}
          />
          <CommandEmpty>No contacts found.</CommandEmpty>
          <CommandGroup>
            {contacts.map((contact) => (
              <CommandItem
                key={contact.id}
                value={contact.id}
                onSelect={() => {
                  form.setValue(field.name, contact.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    field.value === contact.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {contact.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
