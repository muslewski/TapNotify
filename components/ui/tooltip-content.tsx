interface TooltipContentProps {
  label: string;
  description: string;
}

export default function TooltipContent({
  label,
  description,
}: TooltipContentProps) {
  return (
    <div className="py-2">
      <div className="text-sm font-bold">{label}</div>
      <div className="text-xs">{description}</div>
    </div>
  );
}
