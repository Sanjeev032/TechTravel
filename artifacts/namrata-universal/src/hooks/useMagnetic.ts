import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface MagneticOptions {
  strength?: number; // pull strength multiplier, default 0.35
  duration?: number; // animation speed, default 0.5
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(options: MagneticOptions = {}) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const strength = options.strength ?? 0.35;
    const duration = options.duration ?? 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: duration * 1.4,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [options]);

  return elementRef;
}
