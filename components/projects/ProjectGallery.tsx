"use client";

import { useState } from "react";
import type { Project } from "@/content/portfolio";
import { Lightbox } from "@/components/ui/Lightbox";
import { PlaceholderFrame } from "@/components/ui/PlaceholderFrame";

export function ProjectGallery({ project }: { project: Project }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (project.screenshots.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[220px]">
        <PlaceholderFrame title={project.title} />
      </div>
    );
  }

  return (
    <>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {project.screenshots.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="w-4/5 shrink-0 snap-center rounded-[2rem] focus-visible:outline-none md:w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${project.title} screenshot ${index + 1}`}
              className="w-full rounded-[2rem] border border-white/10"
            />
          </button>
        ))}
      </div>

      <Lightbox isOpen={openIndex !== null} onClose={() => setOpenIndex(null)}>
        {openIndex !== null ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.screenshots[openIndex]}
            alt={`${project.title} screenshot ${openIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl"
          />
        ) : null}
      </Lightbox>
    </>
  );
}
