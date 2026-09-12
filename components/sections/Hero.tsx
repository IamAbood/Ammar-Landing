"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { profile } from "@/content/portfolio";
import { Button } from "@/components/ui/Button";
import { TodoText } from "@/components/ui/TodoText";
import { GradientMeshFallback } from "@/components/ui/GradientMeshFallback";
import { isTodo } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <GradientMeshFallback className="h-full w-full" />,
});

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-16 md:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <HeroScene className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/10 via-bg/40 to-bg" />

      <div className="content-shell relative py-20">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mb-6 text-caption font-medium uppercase tracking-[0.2em] text-accent"
        >
          {profile.role}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.06 }}
          className="max-w-4xl text-hero font-semibold text-text text-balance"
        >
          {isTodo(profile.name) ? <TodoText value={profile.name} className="text-hero" /> : profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.12 }}
          className="mt-6 max-w-xl text-lg text-text-muted"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.18 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/#projects" variant="primary">
            View projects
            <ArrowDown className="h-4 w-4" aria-hidden />
          </Button>
          <Button href="/#contact" variant="secondary">
            Get in touch
            <Mail className="h-4 w-4" aria-hidden />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
