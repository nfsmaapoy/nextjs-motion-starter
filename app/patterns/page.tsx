import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Patterns",
  description:
    "API overview for SmoothScrollProvider, Reveal, PageTransition, and reduced-motion helpers.",
};

const primitives = [
  {
    name: "SmoothScrollProvider",
    file: "components/motion/smooth-scroll-provider.tsx",
    api: "children",
    notes: "Creates a Lenis instance on the client, syncs it with GSAP ScrollTrigger, and skips setup when prefers-reduced-motion is set. Wrap the app once in app/layout.tsx.",
  },
  {
    name: "useLenis / useLenisScroll",
    file: "components/motion/smooth-scroll-provider.tsx",
    api: "useLenis() → Lenis | null · useLenisScroll(callback)",
    notes: "Read the Lenis instance or subscribe to scroll progress. Returns null on the server and when smooth scroll is disabled.",
  },
  {
    name: "Reveal",
    file: "components/motion/reveal.tsx",
    api: "children, as, delay, once, className",
    notes: "GSAP ScrollTrigger fade/rise. once defaults to true. Swap as for semantic tags (section, article, li).",
  },
  {
    name: "PageTransition",
    file: "components/motion/page-transition.tsx",
    api: "children",
    notes: "Motion enter animation used from app/template.tsx so it remounts on navigation.",
  },
  {
    name: "usePrefersReducedMotion",
    file: "components/motion/use-prefers-reduced-motion.ts",
    api: "() → boolean",
    notes: "SSR-safe media query via useSyncExternalStore. Pair with getPrefersReducedMotion() inside effects.",
  },
];

export default function PatternsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-28 pb-32 sm:px-10 lg:px-16">
      <Reveal as="p" className="font-mono text-xs tracking-[0.28em] text-[var(--accent)] uppercase">
        /patterns
      </Reveal>
      <Reveal as="h1" delay={0.06} className="mt-4 max-w-3xl text-5xl tracking-[-0.05em] sm:text-6xl">
        Copy these files into another App Router project.
      </Reveal>
      <Reveal as="p" delay={0.12} className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
        This route exists so the starter can demonstrate a Motion page
        transition. The primitives below are the whole public API.
      </Reveal>

      <div className="mt-16 grid gap-4">
        {primitives.map((item, index) => (
          <Reveal
            key={item.name}
            delay={index * 0.06}
            as="article"
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8"
          >
            <h2 className="text-2xl tracking-[-0.03em]">{item.name}</h2>
            <p className="mt-2 font-mono text-xs text-[var(--accent)]">
              {item.file}
            </p>
            <p className="mt-2 font-mono text-xs text-[var(--muted)]">{item.api}</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-[var(--muted)]">
              {item.notes}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-12">
        <Link
          href="/"
          className="inline-flex rounded-full border border-[var(--border)] px-5 py-2.5 text-sm transition-colors hover:border-[var(--foreground)]"
        >
          Back to demo
        </Link>
      </Reveal>
    </main>
  );
}
