import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-all duration-200 ease-[var(--ease-hover)] active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-[#04120f] hover:shadow-[0_0_32px_-4px_rgba(0,229,192,0.6)]",
  secondary: "glass text-text hover:border-accent/40 hover:bg-white/[0.07]",
  ghost: "text-text-muted hover:text-text",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: LinkProps | ButtonProps) {
  const { children, variant = "primary", className, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    const isFile = /\.[a-z0-9]+$/i.test(props.href.split(/[?#]/)[0] ?? "");
    const isExternal = /^https?:\/\//.test(props.href) || props.href.startsWith("mailto:") || isFile;
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    if (isExternal) {
      return (
        <a
          {...anchorRest}
          href={props.href}
          className={classes}
          target={anchorRest.target ?? "_blank"}
          rel={anchorRest.rel ?? "noreferrer noopener"}
        >
          {children}
        </a>
      );
    }

    return (
      <Link {...anchorRest} href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      {children}
    </button>
  );
}
