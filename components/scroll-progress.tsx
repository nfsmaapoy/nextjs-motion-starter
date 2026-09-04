"use client";

import { useEffect, useState } from "react";
import {
  useLenisScroll,
  usePrefersReducedMotion,
} from "@/components/motion";

export function ScrollProgress() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useLenisScroll((lenis) => {
    setProgress(lenis.progress);
  });

  useEffect(() => {
    if (!prefersReducedMotion) {
      return;
    }

    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 h-px bg-[var(--border)]"
    >
      <div
        className="h-full origin-left bg-[var(--accent)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
