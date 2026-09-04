"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getPrefersReducedMotion,
  usePrefersReducedMotion,
} from "./use-prefers-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type LenisStore = {
  getSnapshot: () => Lenis | null;
  set: (next: Lenis | null) => void;
  subscribe: (listener: () => void) => () => void;
};

function createLenisStore(): LenisStore {
  let lenis: Lenis | null = null;
  const listeners = new Set<() => void>();

  return {
    getSnapshot: () => lenis,
    set(next) {
      lenis = next;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Subscribe to Lenis scroll updates. No-ops when smooth scroll is disabled
 * (SSR, reduced motion, or before Lenis mounts).
 */
export function useLenisScroll(onScroll: (lenis: Lenis) => void) {
  const lenis = useLenis();
  const onScrollRef = useRef(onScroll);

  useEffect(() => {
    onScrollRef.current = onScroll;
  }, [onScroll]);

  useEffect(() => {
    if (!lenis) {
      return;
    }

    const handler = () => onScrollRef.current(lenis);
    handler();
    lenis.on("scroll", handler);
    return () => {
      lenis.off("scroll", handler);
    };
  }, [lenis]);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [store] = useState(createLenisStore);

  useEffect(() => {
    if (prefersReducedMotion || getPrefersReducedMotion()) {
      return;
    }

    const instance = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      syncTouch: true,
    });

    instance.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    store.set(instance);

    return () => {
      gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      store.set(null);
    };
  }, [prefersReducedMotion, store]);

  const lenis = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => null,
  );

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
