import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { PlaceholderFrame } from "@/components/ui/PlaceholderFrame";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full rounded-2xl">
      <GlassCard className="flex h-full flex-col p-5 transition-all duration-200 ease-[var(--ease-hover)] group-hover:border-accent/30 group-hover:bg-white/[0.06]">
        <div className="mx-auto mb-5 w-1/2 min-w-[120px]">
          {project.screenshots[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.screenshots[0]} alt={`${project.title} screenshot`} className="w-full rounded-[2rem]" />
          ) : (
            <PlaceholderFrame title={project.title} />
          )}
        </div>

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-medium text-text">{project.title}</h3>
            <p className="mt-1 text-sm text-text-muted">{project.subtitle}</p>
          </div>
          <ArrowUpRight
            className="mt-1 h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 ease-[var(--ease-hover)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech) => (
            <Chip key={tech} label={tech} />
          ))}
        </div>
      </GlassCard>
    </Link>
  );
}
