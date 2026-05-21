import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER } from "@/lib/gsap-presets";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TextRevealOptions {
  type?: "chars" | "words" | "lines";
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
  ease?: string;
}

/**
 * Splits element text into spans and animates them upward from a hidden clip.
 * Works for both scroll-triggered and immediate reveals.
 */
export function useTextReveal<T extends HTMLElement = HTMLHeadingElement>(
  options: TextRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const currentOptions = optionsRef.current;
    const originalHTML = el.innerHTML;
    const type = currentOptions.type ?? "words";
    const ease = currentOptions.ease ?? EASE.cinematic;
    const duration = currentOptions.duration ?? DUR.xl;
    const staggerVal = currentOptions.stagger ?? (type === "chars" ? STAGGER.chars : STAGGER.words);

    // Grab raw text, preserving any inline gradient spans
    // We split only text nodes to avoid breaking markup
    const splitIntoSpans = (node: Node, wrapper: HTMLElement) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? "";
        const units = type === "chars"
          ? text.split("")
          : text.split(/(\s+)/);

        units.forEach((unit) => {
          if (!unit) return;
          if (type !== "chars" && /^\s+$/.test(unit)) {
            // preserve spaces as-is
            wrapper.appendChild(document.createTextNode(unit));
            return;
          }
          const outer = document.createElement("span");
          outer.className = "inline-block overflow-hidden";
          if (type === "chars") outer.style.marginRight = "0.02em";

          const inner = document.createElement("span");
          inner.className = "text-reveal-item inline-block will-change-transform";
          inner.style.transform = "translateY(110%)";
          inner.textContent = unit;

          outer.appendChild(inner);
          wrapper.appendChild(outer);
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Recurse into element children (e.g. <span class="gradient-text">)
        const clone = (node as Element).cloneNode(false) as HTMLElement;
        wrapper.appendChild(clone);
        node.childNodes.forEach((child) => splitIntoSpans(child, clone));
      }
    };

    // Capture child nodes before clearing
    const childNodes = Array.from(el.childNodes);
    el.innerHTML = "";
    childNodes.forEach((node) => splitIntoSpans(node, el));

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>(".text-reveal-item");

      gsap.to(items, {
        y: "0%",
        duration,
        ease,
        delay: currentOptions.delay ?? 0,
        stagger: staggerVal,
        scrollTrigger: currentOptions.start !== "immediate"
          ? {
              trigger: el,
              start: currentOptions.start ?? "top 88%",
              once: currentOptions.once ?? true,
            }
          : undefined,
      });
    }, el);

    return () => {
      ctx.revert();
      el.innerHTML = originalHTML;
    };
  }, []);

  return ref;
}
