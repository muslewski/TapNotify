import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomFieldProps } from "@/types";

export function TemplateSelectField({
  field,
  disabled,
  customProps,
}: CustomFieldProps) {
  return (
    <Select
      disabled={disabled}
      onValueChange={field.onChange}
      defaultValue={field.value}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a template" />
      </SelectTrigger>
      <SelectContent>
        {customProps?.templates?.map(
          (template: { id: string; name: string }) => (
            <SelectItem key={template.id} value={template.id}>
              {template.name}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}
