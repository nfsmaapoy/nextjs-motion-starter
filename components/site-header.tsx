import Link from "next/link";
import { ScrollProgress } from "@/components/scroll-progress";

export function SiteHeader() {
  return (
    <>
      <ScrollProgress />
      <header className="fixed top-0 right-0 left-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--background)_78%,transparent)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-16">
          <Link
            href="/"
            className="font-mono text-xs tracking-[0.18em] text-[var(--foreground)] uppercase"
          >
            Motion Starter
          </Link>
          <nav className="flex items-center gap-6 text-sm text-[var(--muted)]">
            <Link href="/" className="transition-colors hover:text-[var(--foreground)]">
              Demo
            </Link>
            <Link
              href="/patterns"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              Patterns
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
