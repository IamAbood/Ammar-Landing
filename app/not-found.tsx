import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="content-shell flex min-h-[70svh] flex-col items-center justify-center gap-6 py-20 text-center">
      <p className="text-caption uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="text-section font-semibold text-text">Page not found</h1>
      <p className="max-w-md text-text-muted">The page you're looking for doesn't exist or has moved.</p>
      <Button href="/">Back home</Button>
      <Link href="/#projects" className="text-sm text-text-muted transition-colors duration-200 hover:text-text">
        Or browse projects
      </Link>
    </div>
  );
}
