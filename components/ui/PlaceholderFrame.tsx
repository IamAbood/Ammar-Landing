import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderFrameProps {
  title: string;
  className?: string;
}

/** Device-shaped glass placeholder shown wherever a project screenshot doesn't exist yet. */
export function PlaceholderFrame({ title, className }: PlaceholderFrameProps) {
  return (
    <div
      className={cn(
        "glass relative flex aspect-[9/19.5] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[2rem] p-6 text-center",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-accent/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-6 top-3 h-1.5 rounded-full bg-white/10" />
      <ImageOff className="relative h-8 w-8 text-text-muted" aria-hidden />
      <p className="relative text-sm font-medium text-text">{title}</p>
      <p className="relative text-caption text-text-muted">Screenshot coming soon</p>
    </div>
  );
}
