/* eslint-disable  @typescript-eslint/no-explicit-any */

import { type LucideIcon } from "lucide-react";
import { ComponentType } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

/**
 * Configuration for an entity form.
 */
export type EntityConfig<T> = {
  /** Singular name of the entity (e.g., "User"). */
  entityName: string;
  /** Plural name of the entity (e.g., "Users"). */
  entityNamePlural: string;
  /** Path to the entity's API endpoint (e.g., "/users"). */
  entityPath: string;
  /**
   * URL parameter name that represents the entity ID in the route.
   * Example: 'contactId' for `/contacts/:contactId`
   */
  entityParam: string;
  /** Icon component for the heading. */
  entityHeadingIcon?: LucideIcon;
  /** Zod schema for form validation. */
  schema: z.ZodObject<any>;
  /** Initial data for editing an entity. If not provided, a new entity is created. */
  initialData?: T;
  /** Array of fields to be rendered in the form. */
  fields: FormFieldConfig[];
};

/**
 * Base configuration for form fields.
 */
export type BaseFieldConfig = {
  /** Field name, should match the key in the form schema. */
  name: string;
  /** Label displayed for the field. */
  label: string;
  /** Optional description displayed below the field. */
  description?: string;
  /** Placeholder text inside the input field. */
  placeholder?: string;
  /** Optional class name for styling the FormItem container. */
  className?: string;
  /** Optional class name for styling the label. */
  labelClassName?: string;
  /** Optional class name for styling the form control wrapper (input, textarea, etc.). */
  controlClassName?: string;
  /** Default value for the field, if any. */
  defaultValue?: any;
};

/**
 * Configuration for a standard or custom form field.
 */
export type FormFieldConfig = BaseFieldConfig &
  (
    | {
        /** Standard input types supported. */
        type: "text" | "textarea" | "number" | "email" | "tel";
        /** Custom component is not allowed for standard fields. */
        component?: never;
        /** Additional properties for customization (not used for standard fields). */
        customProps?: never;
      }
    | {
        /** Defines a custom form field component. */
        type: "custom";
        /** The custom component to be rendered as a form field. */
        component: ComponentType<CustomFieldProps>;
        /** Additional properties passed to the custom component. */
        customProps?: Record<string, any>;
      }
  );

/**
 * Props provided to a custom field component.
 */
export type CustomFieldProps = {
  /** Field properties from react-hook-form. */
  field: any;
  /** The form instance from react-hook-form. */
  form: UseFormReturn<any>;
  /** Whether the field should be disabled. */
  disabled: boolean;
  /** Additional properties passed from FormFieldConfig. */
  customProps?: Record<string, any>;
  /** Optional class name for styling the custom component. */
  className?: string;
};
