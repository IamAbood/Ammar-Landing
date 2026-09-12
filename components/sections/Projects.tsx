"use client";

import { motion } from "framer-motion";
import { projects } from "@/content/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-32">
      <div className="content-shell">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Native iOS apps and the full-stack systems behind them."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE, delay: (index % 3) * 0.06 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
