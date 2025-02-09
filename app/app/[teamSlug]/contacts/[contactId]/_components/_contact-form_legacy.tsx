"use client";

import Heading from "@/app/app/_components/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .max(13, "Incorrect phone number")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

type ContactFormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  initialData?: Contact;
}

export default function ContactForm({ initialData }: ContactFormProps) {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false); // because we have onDelete outside of the form

  const title = initialData ? "Edit Contact" : "Add Contact";
  const description = initialData
    ? "Edit an existing contact"
    : "Create a new contact";
  const action = initialData ? "Save changes" : "Create contact";
  const toastMessage = initialData
    ? "Contact updated successfully."
    : "Contact created successfully.";

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  // get loading state from form
  const { isSubmitting } = form.formState;

  // Handle form submission
  const onSubmit = async (data: ContactFormValues) => {
    try {
      let response;
      if (initialData) {
        // Send request to update object
        response = await fetch(
          `/api/teams/${params.teamSlug}/contacts/${params.contactId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
      } else {
        // Send request to create new object
        response = await fetch(`/api/teams/${params.teamSlug}/contacts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      } else {
        toast.success(toastMessage);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      router.push(`/app/${params.teamSlug}/contacts`); // Redirect to an entities page
      router.refresh(); // Refresh the page to reflect changes
    }
  };

  // Handle delete object action
  const onDelete = async () => {
    try {
      setLoading(true);

      // Send request to delete an entity
      const response = await fetch(
        `/api/teams/${params.teamSlug}/contacts/${params.contactId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      } else {
        toast.success("Contact deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      router.push(`/app/${params.teamSlug}/contacts`); // Redirect to an entities page
      router.refresh(); // Refresh the page to reflect changes
    }
  };

  return (
    <>
      <Heading
        title={title}
        description={description}
        deleteButton={
          initialData
            ? {
                label: "Delete Contact",
                onClick: onDelete,
              }
            : undefined
        }
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 w-full flex flex-col"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || loading}
                    {...field}
                    placeholder="John Doe"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || loading}
                    {...field}
                    placeholder="+48 123 456 789"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-fit bg-foreground hover:bg-muted-foreground"
            disabled={isSubmitting || loading}
          >
            {isSubmitting ? "Saving..." : action}
          </Button>
        </form>
      </Form>
    </>
  );
}
