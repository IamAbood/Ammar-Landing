"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { about } from "@/content/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientMeshFallback } from "@/components/ui/GradientMeshFallback";

const ScrollAccent = dynamic(() => import("@/components/three/ScrollAccent"), {
  ssr: false,
  loading: () => <GradientMeshFallback className="h-full w-full" />,
});

const EASE = [0.16, 1, 0.3, 1] as const;

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="content-shell grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-start">
        <div>
          <SectionHeading eyebrow="About" title="Native apps, built end to end." />

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
            className="max-w-xl text-lg text-text-muted"
          >
            {about.bio}
          </motion.p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {about.skillGroups.map((group, index) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: index * 0.06 }}
              >
                <GlassCard className="h-full p-5">
                  <h3 className="text-sm font-medium text-text">{group.label}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Chip key={item} label={item} />
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mx-auto aspect-square w-full max-w-[280px]"
          aria-hidden
        >
          <ScrollAccent className="h-full w-full" variant="octahedron" />
        </motion.div>
      </div>
    </section>
  );
}
