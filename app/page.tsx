import Link from "next/link";
import { Reveal } from "@/components/motion";
import { Hero } from "@/components/hero";

const scenes = [
  {
    id: "01",
    title: "Lenis smooth scroll",
    body: "Wheel and touch input are interpolated so the page glides instead of jumping. ScrollTrigger stays in sync through the GSAP ticker. Disabled automatically when the user prefers reduced motion.",
  },
  {
    id: "02",
    title: "GSAP section reveals",
    body: "Each block below is a Reveal primitive: fade and rise when it enters the viewport. Pass delay, once, and as to copy the pattern into another project without a design system.",
  },
  {
    id: "03",
    title: "Motion route transitions",
    body: "app/template.tsx wraps every page in PageTransition. Navigate to Patterns to see a short enter animation, then come back. Duration collapses to zero under prefers-reduced-motion.",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      <section
        id="patterns"
        className="mx-auto max-w-6xl px-6 py-28 sm:px-10 lg:px-16"
      >
        <Reveal as="p" className="font-mono text-xs tracking-[0.28em] text-[var(--accent)] uppercase">
          Scroll scenes
        </Reveal>
        <Reveal as="h2" delay={0.08} className="mt-4 max-w-2xl text-4xl tracking-[-0.04em] sm:text-5xl">
          Three primitives, one page.
        </Reveal>

        <div className="mt-16 grid gap-4">
          {scenes.map((scene, index) => (
            <Reveal
              key={scene.id}
              delay={index * 0.08}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10"
            >
              <p className="font-mono text-xs text-[var(--accent)]">{scene.id}</p>
              <h3 className="mt-4 text-2xl tracking-[-0.03em]">{scene.title}</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-[var(--muted)]">
                {scene.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32 sm:px-10 lg:px-16">
        <Reveal className="rounded-3xl border border-[var(--border)] px-8 py-16 sm:px-12">
          <p className="font-mono text-xs tracking-[0.28em] text-[var(--accent)] uppercase">
            Next route
          </p>
          <h2 className="mt-4 max-w-xl text-4xl tracking-[-0.04em]">
            See the template animation on another page.
          </h2>
          <Link
            href="/patterns"
            className="mt-8 inline-flex rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
          >
            Open Patterns
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
