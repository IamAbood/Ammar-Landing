"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { TodoText } from "@/components/ui/TodoText";
import { GradientMeshFallback } from "@/components/ui/GradientMeshFallback";
import { isTodo } from "@/lib/utils";

const ScrollAccent = dynamic(() => import("@/components/three/ScrollAccent"), {
  ssr: false,
  loading: () => <GradientMeshFallback className="h-full w-full" />,
});

const EASE = [0.16, 1, 0.3, 1] as const;

const CONTACT_LINKS = [
  { id: "email", label: "Email", value: profile.email, icon: Mail, href: (v: string) => `mailto:${v}` },
  { id: "github", label: "GitHub", value: profile.github, icon: Github, href: (v: string) => v },
  { id: "linkedin", label: "LinkedIn", value: profile.linkedin, icon: Linkedin, href: (v: string) => v },
] as const;

export function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-32">
      <div className="content-shell grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mx-auto aspect-square w-full max-w-[220px] md:order-2"
          aria-hidden
        >
          <ScrollAccent className="h-full w-full" variant="torus" />
        </motion.div>

        <div className="md:order-1">
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something native."
            description="Open to iOS and full-stack mobile opportunities — reach out directly or grab the CV."
          />

          <div className="space-y-3">
            {CONTACT_LINKS.map((link) => (
              <ContactRow key={link.id} {...link} />
            ))}
          </div>

          <div className="mt-8">
            <Button href={profile.cvUrl} variant="secondary">
              Download CV
              <Download className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  icon: Icon,
  href,
}: {
  label: string;
  value: string;
  icon: typeof Mail;
  href: (v: string) => string;
}) {
  if (isTodo(value)) {
    return (
      <GlassCard className="flex items-center gap-4 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-text-muted">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p className="text-caption text-text-muted">{label}</p>
          <TodoText value={value} />
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard
      as="a"
      href={href(value)}
      target={label === "Email" ? undefined : "_blank"}
      rel={label === "Email" ? undefined : "noreferrer noopener"}
      className="group flex items-center gap-4 p-4 transition-colors duration-200 ease-[var(--ease-hover)] hover:border-accent/40 hover:bg-white/[0.07]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-text transition-colors duration-200 group-hover:text-accent">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div>
        <p className="text-caption text-text-muted">{label}</p>
        <p className="text-text">{value}</p>
      </div>
    </GlassCard>
  );
}
