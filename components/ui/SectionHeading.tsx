interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-2xl md:mb-16">
      {eyebrow ? (
        <span className="mb-3 block text-caption font-medium uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-section font-semibold text-text text-balance">{title}</h2>
      {description ? <p className="mt-4 text-text-muted">{description}</p> : null}
    </div>
  );
}
