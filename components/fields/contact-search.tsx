"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CustomFieldProps } from "@/types/entity-form";
import type { Contact } from "@prisma/client";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

// Utility functions remain the same
function normalizePhoneNumber(phone: string | null): string {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
}

function fuzzySearch(items: Contact[], searchValue: string) {
  const search = searchValue.toLowerCase();
  const normalizedSearch = normalizePhoneNumber(search);

  return items.filter((item) => {
    if (!item) return false;

    if (normalizedSearch.length > 0) {
      const normalizedPhone = normalizePhoneNumber(item.phone);
      if (normalizedPhone.includes(normalizedSearch)) {
        return true;
      }
    }

    if (!item.contactLabel) return false;

    const label = item.contactLabel.toLowerCase();
    if (label.includes(search)) return true;

    const searchLetters = search.split("");
    let currentIndex = 0;

    for (const letter of searchLetters) {
      const index = label.indexOf(letter, currentIndex);
      if (index === -1) return false;
      currentIndex = index + 1;
    }

    return true;
  });
}

export function ContactSearchField({
  field,
  form,
  disabled,
  customProps,
}: CustomFieldProps) {
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>(
    customProps?.initialSelectedContacts || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/teams/${params.teamSlug}/contacts`);
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      setError("Failed to load contacts. Please try again.");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [params.teamSlug]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    const newValue = selectedContacts.map((contact) => contact.id);
    form.setValue(field.name, newValue, {
      shouldValidate: form.formState.isSubmitted, // Only validate if form was previously submitted
      shouldDirty: true,
      shouldTouch: false,
    });
  }, [selectedContacts, field.name, form]);

  const filteredContacts = useMemo(() => {
    if (!inputValue.trim()) return contacts;
    return fuzzySearch(contacts, inputValue.trim());
  }, [contacts, inputValue]);

  const handleSelect = useCallback(
    (selectedValue: string) => {
      // If in single select mode, replace the entire selection
      if (customProps?.singleSelect) {
        const selectedContact = contacts.find(
          (contact) => contact.id === selectedValue
        );
        if (!selectedContact) return;

        setSelectedContacts([selectedContact]);
        form.setValue(field.name, selectedContact.id);
        setOpen(false); // Close the popover after selection
        return;
      }

      if (selectedValue === "select-all") {
        // Toggle all filtered contacts
        const allSelected = filteredContacts.every((contact) =>
          selectedContacts.some((selected) => selected.id === contact.id)
        );

        if (allSelected) {
          // Remove all filtered contacts from selection
          setSelectedContacts((prev) =>
            prev.filter(
              (contact) =>
                !filteredContacts.some((filtered) => filtered.id === contact.id)
            )
          );
        } else {
          // Add all filtered contacts to selection
          const newContacts = filteredContacts.filter(
            (contact) =>
              !selectedContacts.some((selected) => selected.id === contact.id)
          );
          setSelectedContacts((prev) => [...prev, ...newContacts]);
        }
        return;
      }

      const selectedContact = contacts.find(
        (contact) => contact.id === selectedValue
      );
      if (!selectedContact) return;

      setSelectedContacts((prev) => {
        const isSelected = prev.some((c) => c.id === selectedContact.id);
        if (isSelected) {
          return prev.filter((c) => c.id !== selectedContact.id);
        }
        return [...prev, selectedContact];
      });
    },
    [
      contacts,
      filteredContacts,
      selectedContacts,
      customProps?.singleSelect,
      field.name,
      form,
    ]
  );

  const removeContact = useCallback((contactId: string) => {
    setSelectedContacts((prev) => prev.filter((c) => c.id !== contactId));
  }, []);

  const highlightMatch = useCallback((text: string, search: string) => {
    if (!search.trim()) return text;

    const normalizedText = text.toLowerCase();
    const normalizedSearch = search.toLowerCase();
    const index = normalizedText.indexOf(normalizedSearch);

    if (index === -1) return text;

    return (
      <>
        {text.slice(0, index)}
        <span className="bg-yellow-200 dark:bg-yellow-800">
          {text.slice(index, index + search.length)}
        </span>
        {text.slice(index + search.length)}
      </>
    );
  }, []);

  // Calculate if all filtered contacts are selected
  const allFilteredSelected = useMemo(() => {
    return (
      filteredContacts.length > 0 &&
      filteredContacts.every((contact) =>
        selectedContacts.some((selected) => selected.id === contact.id)
      )
    );
  }, [filteredContacts, selectedContacts]);

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-full justify-between"
          >
            {selectedContacts.length > 0
              ? customProps?.singleSelect
                ? selectedContacts[0].contactLabel || selectedContacts[0].phone
                : `${selectedContacts.length} contact${
                    selectedContacts.length > 1 ? "s" : ""
                  } selected`
              : "Select contact..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search by label or phone..."
              value={inputValue}
              onValueChange={setInputValue}
              className="border-none focus:ring-0"
            />
            <CommandList>
              {loading && <CommandEmpty>Loading contacts...</CommandEmpty>}
              {error && (
                <CommandEmpty className="text-red-500">{error}</CommandEmpty>
              )}
              {!loading && !error && filteredContacts.length === 0 && (
                <CommandEmpty>No contacts found.</CommandEmpty>
              )}
              {!loading && !error && filteredContacts.length > 0 && (
                <>
                  {!customProps?.singleSelect && (
                    <>
                      <CommandItem
                        value="select-all"
                        onSelect={() => handleSelect("select-all")}
                        className="cursor-pointer"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            allFilteredSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="font-medium">
                          {allFilteredSelected ? "Deselect All" : "Select All"}
                          {inputValue.trim() ? " Filtered" : ""}
                        </span>
                      </CommandItem>
                      <CommandSeparator />
                    </>
                  )}
                  <CommandGroup>
                    {filteredContacts.map((contact) => {
                      const isSelected = selectedContacts.some(
                        (c) => c.id === contact.id
                      );

                      return (
                        <CommandItem
                          key={contact.id}
                          value={contact.id}
                          onSelect={handleSelect}
                          className={cn(
                            "cursor-pointer",
                            isSelected && "bg-accent"
                          )}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <span
                            className={cn(
                              "flex-1",
                              isSelected && "font-medium"
                            )}
                          >
                            <div>
                              {highlightMatch(
                                contact.contactLabel || "",
                                inputValue
                              )}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              {highlightMatch(contact.phone || "", inputValue)}
                            </div>
                          </span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {!customProps?.singleSelect && selectedContacts.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedContacts.map((contact) => (
            <Badge
              key={contact.id}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {contact.contactLabel}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-transparent"
                onClick={() => removeContact(contact.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
