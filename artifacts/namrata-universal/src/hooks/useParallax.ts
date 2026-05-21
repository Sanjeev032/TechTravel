import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ParallaxOptions {
  speed?: number; // speed ratio, e.g. 0.1 to 0.3
  direction?: "vertical" | "horizontal";
  start?: string;
  end?: string;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(options: ParallaxOptions = {}) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const speed = options.speed ?? 0.15;
    const direction = options.direction || "vertical";
    const prop = direction === "vertical" ? "y" : "x";
    const distance = speed * 200;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { [prop]: -distance },
        {
          [prop]: distance,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: options.start || "top bottom",
            end: options.end || "bottom top",
            scrub: true,
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options]);

  return elementRef;
}
