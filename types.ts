/* eslint-disable  @typescript-eslint/no-explicit-any */

import { ComponentType } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type EntityConfig<T> = {
  entityName: string;
  entityNamePlural: string;
  schema: z.ZodObject<any>;
  initialData?: T;
  fields: FormFieldConfig[];
};

export type BaseFieldConfig = {
  name: string;
  label: string;
  placeholder?: string;
  className?: string; // Class for the FormItem
  labelClassName?: string; // Optional class for the label
  controlClassName?: string; // Optional class for the form control wrapper
  defaultValue?: any;
};

export type FormFieldConfig = BaseFieldConfig &
  (
    | {
        type: "text" | "textarea" | "number" | "email" | "tel";
        component?: never;
        customProps?: never;
      }
    | {
        type: "custom";
        component: ComponentType<CustomFieldProps>;
        customProps?: Record<string, any>;
      }
  );

export type CustomFieldProps = {
  field: any;
  form: UseFormReturn<any>;
  disabled: boolean;
  customProps?: Record<string, any>;
  className?: string;
};
