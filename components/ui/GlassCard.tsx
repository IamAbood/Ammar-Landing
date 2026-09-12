import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps<T extends ElementType> = {
  children: ReactNode;
  className?: string;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function GlassCard<T extends ElementType = "div">({
  children,
  className,
  as,
  ...rest
}: GlassCardProps<T>) {
  // Polymorphic `as` prop: TS can't statically narrow JSX props/children for a generic
  // element type, so the render itself opts out here — callers still get the fully
  // typed `GlassCardProps<T>` above.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (as ?? "div") as any;
  return (
    <Tag className={cn("glass rounded-2xl", className)} {...rest}>
      {children}
    </Tag>
  );
}
