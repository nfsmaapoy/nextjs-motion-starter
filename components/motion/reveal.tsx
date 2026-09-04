"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, type HTMLAttributes, type ReactNode } from "react";
import { getPrefersReducedMotion } from "./use-prefers-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type RevealTag =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "li";

export type RevealProps = {
  children: ReactNode;
  as?: RevealTag;
  delay?: number;
  once?: boolean;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

export function Reveal({
  children,
  as = "div",
  delay = 0,
  once = true,
  className,
  ...rest
}: RevealProps) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element) {
      return;
    }

    if (getPrefersReducedMotion()) {
      gsap.set(element, { clearProps: "transform", autoAlpha: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      element,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, element, once]);

  const props = {
    className,
    "data-reveal": "",
    ...rest,
    children,
    ref: setElement,
  };

  switch (as) {
    case "section":
      return <section {...props} />;
    case "article":
      return <article {...props} />;
    case "header":
      return <header {...props} />;
    case "footer":
      return <footer {...props} />;
    case "p":
      return <p {...props} />;
    case "h1":
      return <h1 {...props} />;
    case "h2":
      return <h2 {...props} />;
    case "h3":
      return <h3 {...props} />;
    case "li":
      return <li {...props} />;
    default:
      return <div {...props} />;
  }
}
