import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, ST_DEFAULTS } from "@/lib/gsap-presets";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

export interface RevealOptions {
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  once?: boolean;
  stagger?: number | gsap.StaggerVars;
  /** CSS selector: if set, targets children matching this selector instead of the root */
  childSelector?: string;
  /** Custom from-vars override */
  from?: gsap.TweenVars;
  /** Custom to-vars override */
  to?: gsap.TweenVars;
}

function buildFromVars(direction: RevealDirection, distance: number): gsap.TweenVars {
  switch (direction) {
    case "up":    return { opacity: 0, y: distance };
    case "down":  return { opacity: 0, y: -distance };
    case "left":  return { opacity: 0, x: distance };
    case "right": return { opacity: 0, x: -distance };
    case "scale": return { opacity: 0, scale: 0.88 };
    case "fade":  return { opacity: 0 };
  }
}

export function useRevealAnimation<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const currentOptions = optionsRef.current;
    const direction = currentOptions.direction ?? "up";
    const distance = currentOptions.distance ?? 40;
    const duration = currentOptions.duration ?? DUR.md;
    const delay = currentOptions.delay ?? 0;
    const ease = currentOptions.ease ?? EASE.cinematic;
    const once = currentOptions.once ?? ST_DEFAULTS.once;

    const fromVars: gsap.TweenVars = currentOptions.from ?? buildFromVars(direction, distance);
    const toVars: gsap.TweenVars = {
      ...(currentOptions.to ?? { opacity: 1, y: 0, x: 0, scale: 1 }),
      duration,
      delay,
      ease,
    };

    if (currentOptions.stagger) {
      toVars.stagger = currentOptions.stagger;
    }

    const ctx = gsap.context(() => {
      const target = currentOptions.childSelector
        ? el.querySelectorAll(currentOptions.childSelector)
        : el;

      gsap.fromTo(target, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start: currentOptions.start ?? ST_DEFAULTS.start,
          end: currentOptions.end ?? ST_DEFAULTS.end,
          scrub: currentOptions.scrub ?? false,
          once,
          toggleActions: ST_DEFAULTS.toggleActions,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
