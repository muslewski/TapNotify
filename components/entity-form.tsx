"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Heading from "@/app/app/_components/heading";
import { EntityConfig, FormFieldConfig } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useConfirmModal } from "@/providers/confirm-modal-context";

export default function EntityForm<T>({ config }: { config: EntityConfig<T> }) {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { confirmModal } = useConfirmModal();

  // Get the entity ID from the URL
  const entityId = params[config.entityParam];

  const title = config.initialData
    ? `Edit ${config.entityName}`
    : `Add ${config.entityName}`;
  const description = config.initialData
    ? `Edit an existing ${config.entityName.toLowerCase()}`
    : `Create a new ${config.entityName.toLowerCase()}`;
  const action = config.initialData
    ? "Save changes"
    : `Create ${config.entityName.toLowerCase()}`;
  const toastMessage = config.initialData
    ? `${config.entityName} updated successfully.`
    : `${config.entityName} created successfully.`;

  // Create initial default values from fields configuration
  const defaultValues = config.fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]:
        config.initialData?.[field.name as keyof T] ?? field.defaultValue ?? "",
    }),
    {}
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<{ [key: string]: any }>({
    resolver: zodResolver(config.schema),
    defaultValues: defaultValues,
  });

  const { isSubmitting } = form.formState;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      const baseUrl = `/api/teams/${params.teamSlug}/${config.entityPath}`;
      const url = config.initialData ? `${baseUrl}/${entityId}` : baseUrl;

      const response = await fetch(url, {
        method: config.initialData ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(await response.text());

      toast.success(toastMessage);
      router.push(`/app/${params.teamSlug}/${config.entityPath}`);
      router.refresh();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      const confirmed = await confirmModal({
        heading: `Delete  ${config.entityName}`,
        description: `Are you sure you want to delete this ${config.entityName.toLowerCase()}?`,
        confirmLabel: "Delete",
        confirmVariant: "destructive",
      });

      if (confirmed) {
        const response = await fetch(
          `/api/teams/${params.teamSlug}/${config.entityPath}/${entityId}`,
          { method: "DELETE" }
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        toast.success(`${config.entityName} deleted successfully.`);
        router.push(`/app/${params.teamSlug}/${config.entityPath}`);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderField = (field: FormFieldConfig, formField: any) => {
    if (field.type === "custom" && field.component) {
      const CustomComponent = field.component;
      return (
        <CustomComponent
          field={formField}
          form={form}
          disabled={isSubmitting || loading}
          customProps={field.customProps}
          className={field.controlClassName}
        />
      );
    }

    if (field.type === "textarea") {
      return (
        <Textarea
          disabled={isSubmitting || loading}
          placeholder={field.placeholder}
          className={field.controlClassName}
          {...formField}
        />
      );
    }

    return (
      <Input
        type={field.type}
        disabled={isSubmitting || loading}
        placeholder={field.placeholder}
        className={field.controlClassName}
        {...formField}
      />
    );
  };

  return (
    <>
      <Heading
        title={title}
        description={description}
        deleteButton={
          config.initialData
            ? {
                label: `Delete ${config.entityName}`,
                onClick: onDelete,
              }
            : undefined
        }
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full flex flex-col"
        >
          {config.fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem
                  className={cn(
                    "w-full flex flex-col gap-1 py-2",
                    field.className
                  )}
                >
                  <FormLabel className={field.labelClassName}>
                    {field.label}
                  </FormLabel>
                  <FormControl>{renderField(field, formField)}</FormControl>
                  {field.description && (
                    <FormDescription>{field.description}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

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
