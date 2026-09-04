"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { getPrefersReducedMotion } from "@/components/motion";

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const lines = root.querySelectorAll("[data-hero-line]");
    const ctx = gsap.context(() => {
      if (getPrefersReducedMotion()) {
        gsap.set(lines, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        lines,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.1,
          delay: 0.08,
          ease: "power3.out",
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-20 pt-32 sm:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_10%_0%,rgba(212,255,74,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <p
          data-hero-line
          className="font-mono text-xs tracking-[0.28em] text-[var(--accent)] uppercase"
        >
          Next.js · GSAP · Motion · Lenis
        </p>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.8rem,9vw,7.5rem)] leading-[0.9] font-medium tracking-[-0.05em] text-[var(--foreground)]">
          <span data-hero-line className="block">
            Motion
          </span>
          <span data-hero-line className="block text-[var(--muted)]">
            Starter
          </span>
        </h1>
        <p
          data-hero-line
          className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl"
        >
          A walking-skeleton starter for cloneable scroll, reveal, and route
          transition patterns. Dark, fast, and reduced-motion aware.
        </p>
        <div data-hero-line className="mt-10 flex flex-wrap gap-4">
          <a
            href="#patterns"
            className="inline-flex items-center rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
          >
            Scroll the scenes
          </a>
          <a
            href="/patterns"
            className="inline-flex items-center rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--foreground)]"
          >
            Route transition
          </a>
        </div>
      </div>
    </section>
  );
}
