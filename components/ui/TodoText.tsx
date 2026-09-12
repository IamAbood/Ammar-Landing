import { cn, isTodo } from "@/lib/utils";

interface TodoTextProps {
  value: string;
  className?: string;
  as?: "span" | "div";
}

/** Renders a value verbatim, but visibly flags it as an unfilled placeholder. */
export function TodoText({ value, className, as = "span" }: TodoTextProps) {
  const Tag = as;

  if (!isTodo(value)) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-md border border-dashed border-accent-secondary/50 bg-accent-secondary/10 px-2 py-0.5 align-middle text-caption text-accent-secondary [overflow-wrap:anywhere]",
        className,
      )}
      title="Placeholder — needs real content"
    >
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
      {value}
    </Tag>
  );
}
