import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/portfolio";
import { TodoText } from "@/components/ui/TodoText";
import { isTodo } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-10">
      <div className="content-shell flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-caption text-text-muted">
          © {year} <TodoText value={profile.name} />. Built with Next.js &amp; React Three Fiber.
        </p>

        <div className="flex items-center gap-2">
          <FooterIconLink href={profile.email} icon={Mail} label="Email" isEmail />
          <FooterIconLink href={profile.github} icon={Github} label="GitHub" />
          <FooterIconLink href={profile.linkedin} icon={Linkedin} label="LinkedIn" />
        </div>
      </div>
    </footer>
  );
}

function FooterIconLink({
  href,
  icon: Icon,
  label,
  isEmail = false,
}: {
  href: string;
  icon: typeof Mail;
  label: string;
  isEmail?: boolean;
}) {
  if (isTodo(href)) {
    return (
      <span
        className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-accent-secondary/50 text-accent-secondary"
        title={`${label}: ${href} (placeholder)`}
      >
        <Icon className="h-4 w-4" aria-hidden />
      </span>
    );
  }

  return (
    <a
      href={isEmail ? `mailto:${href}` : href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noreferrer noopener"}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full text-text-muted transition-colors duration-200 hover:bg-white/[0.06] hover:text-text"
    >
      <Icon className="h-4 w-4" aria-hidden />
    </a>
  );
}
