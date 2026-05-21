/**
 * Wonder Makers GSAP Presets
 * Centralized easing, duration, and stagger constants.
 * Use these everywhere — never inline magic numbers.
 */

// ─── Easing ───────────────────────────────────────────────
export const EASE = {
  /** Standard smooth reveal */
  out: "power3.out",
  /** Fast start, smooth settle */
  expo: "expo.out",
  /** Cinematic deceleration — WM primary ease */
  cinematic: "power4.out",
  /** Organic spring snap-back (magnetic / hover) */
  elastic: "elastic.out(1, 0.3)",
  /** Linear — for scrubbed parallax */
  none: "none",
  /** Custom bezier matching WM transitions */
  wm: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

// ─── Durations (seconds) ──────────────────────────────────
export const DUR = {
  xs: 0.3,
  sm: 0.5,
  md: 0.8,
  lg: 1.0,
  xl: 1.2,
  /** Hero char-by-char reveal */
  hero: 1.4,
} as const;

// ─── Stagger configs ──────────────────────────────────────
export const STAGGER = {
  /** Cards / grid items */
  cards: { amount: 0.4, from: "start" as const, ease: "power2.out" },
  /** Tight char-by-char */
  chars: 0.018,
  /** Word-by-word */
  words: 0.05,
  /** Nav items */
  nav: 0.06,
} as const;

// ─── From-states ──────────────────────────────────────────
export const FROM = {
  fadeUp: { opacity: 0, y: 50 },
  fadeUpSm: { opacity: 0, y: 25 },
  fadeLeft: { opacity: 0, x: -40 },
  fadeRight: { opacity: 0, x: 40 },
  scaleIn: { opacity: 0, scale: 0.9 },
  hidden: { opacity: 0 },
} as const;

export const TO = {
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
} as const;

// ─── ScrollTrigger defaults ───────────────────────────────
export const ST_DEFAULTS = {
  start: "top 85%",
  end: "bottom 15%",
  once: true,
  toggleActions: "play none none none" as const,
} as const;
