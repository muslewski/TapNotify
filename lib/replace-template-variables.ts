interface TemplateData {
  name?: string;
  phone?: string;
}

export function replaceTemplateVariables(
  template: string,
  data: TemplateData
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (key !== "name" && key !== "phone") {
      throw new Error(
        `Invalid template variable: {{${key}}}. Only {{name}} and {{phone}} are supported.`
      );
    }

    const replacement =
      data[key as keyof TemplateData] ??
      `data${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    return replacement;
  });
}
