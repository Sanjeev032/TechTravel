import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useGetTestimonials } from "@workspace/api-client-react";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useTextReveal } from "@/hooks/useTextReveal";

export default function TestimonialsSection() {
  const { data: testimonials } = useGetTestimonials();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const labelRef = useRevealAnimation<HTMLDivElement>({ direction: "up" });
  const headingRef = useTextReveal<HTMLHeadingElement>({ type: "words" });

  const len = testimonials?.length ?? 0;

  useEffect(() => {
    if (!len) return;
    const t = setInterval(() => { setDirection(1); setCurrent((c) => (c + 1) % len); }, 6000);
    return () => clearInterval(t);
  }, [len]);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + len) % len);
  };

  const t = testimonials?.[current];

  return (
    <section id="testimonials" className="wm-section relative" data-testid="testimonials-section">
      <div className="wm-separator mb-16" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(200,250,72,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-14">
          <div ref={labelRef} className="wm-section-label wm-label text-muted-foreground mb-5">Reviews</div>
          <h2 ref={headingRef} className="wm-h2 text-foreground">What Our Clients Say</h2>
        </div>

        <div className="relative max-w-3xl">
          <AnimatePresence mode="wait" custom={direction}>
            {t && (
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 50 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="wm-card p-8 md:p-10"
                data-testid={`testimonial-${t.id}`}
              >
                <Quote size={32} className="text-[var(--wm-lime)]/30 mb-6" />
                <p className="wm-body text-foreground text-base md:text-lg leading-relaxed mb-8">
                  "{t.content}"
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    {t.avatarUrl && !imgErrors[t.id] ? (
                      <img
                        src={t.avatarUrl}
                        alt={t.name}
                        onError={() => setImgErrors((p) => ({ ...p, [t.id]: true }))}
                        className="w-12 h-12 rounded-full object-cover border border-[var(--wm-lime)]/20"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[var(--wm-lime)]/10 border border-[var(--wm-lime)]/20 flex items-center justify-center text-[var(--wm-lime)] font-bold">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="wm-h3 text-sm text-foreground">{t.name}</p>
                      <p className="wm-label text-muted-foreground">{t.role} · {t.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-[var(--wm-lime)] fill-[var(--wm-lime)]" />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => go(-1)}
              className="w-9 h-9 rounded-full wm-card flex items-center justify-center text-muted-foreground hover:text-[var(--wm-lime)] hover:border-[rgba(200,250,72,0.25)] transition-colors"
              data-testid="testimonial-prev"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {(testimonials ?? []).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? "w-7 h-2 bg-[var(--wm-lime)]" : "w-2 h-2 bg-white/15 hover:bg-white/30"
                  }`}
                  data-testid={`testimonial-dot-${i}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="w-9 h-9 rounded-full wm-card flex items-center justify-center text-muted-foreground hover:text-[var(--wm-lime)] hover:border-[rgba(200,250,72,0.25)] transition-colors"
              data-testid="testimonial-next"
            >
              <ChevronRight size={18} />
            </button>
            <p className="wm-label text-muted-foreground ml-2">{current + 1} / {len}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
