"use client";

export const formatTemplateContent = (content: string) => {
  // Split the content based on dynamic values ({{...}})
  const parts = content.split(/(\{\{[^}]+\}\})/g);
  return parts.map((part, index) => {
    if (part.match(/^\{\{[^}]+\}\}$/)) {
      // If the part is a dynamic value, wrap it in a code element
      return (
        <code
          key={index}
          className="px-1 py-0.5 rounded-2xl bg-muted text-primary dark:text-primary-700 font-mono"
        >
          {part}
        </code>
      );
    }
    return <span key={index}>{part}</span>;
  });
};
