"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

/** SSR-safe `prefers-reduced-motion` reader. Server snapshot is `false`. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function getPrefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(QUERY).matches;
}
