import { cn } from "@/lib/utils";

/** Static CSS gradient-mesh used wherever 3D rendering is skipped or still loading. */
export function GradientMeshFallback({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] bg-surface", className)} aria-hidden>
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(circle at 28% 24%, rgba(0,229,192,0.35), transparent 60%), radial-gradient(circle at 76% 68%, rgba(124,92,255,0.32), transparent 55%), radial-gradient(circle at 50% 100%, rgba(0,229,192,0.14), transparent 50%)",
        }}
      />
      <div className="absolute inset-0 bg-bg/30" />
    </div>
  );
}
