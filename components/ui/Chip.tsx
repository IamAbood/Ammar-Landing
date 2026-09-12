import { cn, isTodo } from "@/lib/utils";

export function Chip({ label, className }: { label: string; className?: string }) {
  const todo = isTodo(label);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-caption",
        todo
          ? "border-dashed border-accent-secondary/50 bg-accent-secondary/10 text-accent-secondary"
          : "border-white/10 bg-white/[0.04] text-text-muted",
        className,
      )}
    >
      {label}
    </span>
  );
}
