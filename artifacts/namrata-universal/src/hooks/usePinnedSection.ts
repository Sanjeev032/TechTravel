import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface PinnedSectionOptions {
  triggerSelector?: string;
  horizontalSelector: string;
  start?: string;
  end?: string;
}

export function usePinnedSection<T extends HTMLElement = HTMLDivElement>(options: PinnedSectionOptions) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const horizontalEl = container.querySelector(options.horizontalSelector) as HTMLElement;
    if (!horizontalEl) return;

    const ctx = gsap.context(() => {
      const scrollWidth = horizontalEl.scrollWidth;
      const clientWidth = container.clientWidth;
      const xTranslation = -(scrollWidth - clientWidth);

      if (xTranslation >= 0) return;

      gsap.to(horizontalEl, {
        x: xTranslation,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: options.start || "top top",
          end: options.end || `+=${Math.abs(xTranslation)}`,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [options]);

  return containerRef;
}
