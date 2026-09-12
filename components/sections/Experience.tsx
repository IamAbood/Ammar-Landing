"use client";

import { motion } from "framer-motion";
import { experience } from "@/content/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";
import { TodoText } from "@/components/ui/TodoText";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-32">
      <div className="content-shell">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />

        <div className="relative">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10 md:left-[9px]" aria-hidden />

          <ol className="space-y-10">
            {experience.map((role, index) => (
              <motion.li
                key={role.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: index * 0.06 }}
                className="relative pl-8 md:pl-10"
              >
                <span
                  className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg md:h-[18px] md:w-[18px]"
                  aria-hidden
                />
                <GlassCard className="p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <h3 className="text-base font-medium text-text">
                      {role.title} · {role.company}
                      {role.companyNative ? (
                        <span className="ml-2 text-text-muted">({role.companyNative})</span>
                      ) : null}
                    </h3>
                    <TodoText value={role.dates} />
                  </div>
                  <p className="mt-3 text-text-muted">{role.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.tech.map((tech) => (
                      <Chip key={tech} label={tech} />
                    ))}
                  </div>
                </GlassCard>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
