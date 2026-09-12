import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Smartphone } from "lucide-react";
import { projects } from "@/content/portfolio";
import { Chip } from "@/components/ui/Chip";
import { TodoText } from "@/components/ui/TodoText";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.title} — Project`, description: project.subtitle };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const hasLinks = Boolean(project.links.appStore || project.links.github || project.links.live);

  return (
    <article className="pb-20 pt-28 md:pb-32 md:pt-36">
      <div className="content-shell">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-200 hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to projects
        </Link>

        <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-caption font-medium uppercase tracking-[0.2em] text-accent">{project.role}</p>
            <h1 className="mt-3 text-section font-semibold text-text">{project.title}</h1>
            <p className="mt-2 max-w-xl text-text-muted">{project.subtitle}</p>
          </div>
          <TodoText value={project.year} className="mt-1" />
        </div>

        {hasLinks ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.appStore ? (
              <ExternalLinkChip href={project.links.appStore} label="App Store" icon={Smartphone} />
            ) : null}
            {project.links.github ? (
              <ExternalLinkChip href={project.links.github} label="Source" icon={Github} />
            ) : null}
            {project.links.live ? (
              <ExternalLinkChip href={project.links.live} label="Live" icon={ExternalLink} />
            ) : null}
          </div>
        ) : null}

        <div className="mt-12">
          <ProjectGallery project={project} />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-lg font-medium text-text">Overview</h2>
            <p className="mt-3 text-text-muted">{project.description}</p>

            <h2 className="mt-8 text-lg font-medium text-text">Highlights</h2>
            <ul className="mt-3 space-y-2">
              {project.highlights.map((point) => (
                <li key={point} className="flex gap-3 text-text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-medium text-text">Tech stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Chip key={tech} label={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ExternalLinkChip({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof ExternalLink;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-text transition-colors duration-200 hover:border-accent/40 hover:bg-white/[0.07]"
    >
      <Icon className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}
