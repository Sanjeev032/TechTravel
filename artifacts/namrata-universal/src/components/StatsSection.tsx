import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGetStats } from "@workspace/api-client-react";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function StatItem({
  stat,
  index,
}: {
  stat: { id: number; value: number; label: string; suffix?: string; prefix?: string };
  index: number;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  const cardRef = useRevealAnimation<HTMLDivElement>({
    direction: "up",
    distance: 30,
    delay: index * 0.08,
    start: "top 92%",
  });

  useEffect(() => {
    const card = cardRef.current;
    const numEl = numRef.current;
    if (!card || !numEl) return;
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2.2,
        ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 92%", once: true },
        onUpdate: () => { numEl.innerText = Math.floor(obj.val).toString(); },
      });
    }, card);
    return () => ctx.revert();
  }, [stat.value, cardRef]);

  return (
    <div
      ref={cardRef}
      className="text-center border-r border-white/5 last:border-r-0 px-6 py-8"
      data-testid={`stat-card-${stat.id}`}
    >
      <div className="counter-number wm-h1 text-foreground mb-2" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
        {stat.prefix}<span ref={numRef}>0</span>{stat.suffix}
      </div>
      <p className="wm-label text-muted-foreground uppercase">{stat.label}</p>
    </div>
  );
}

export default function StatsSection() {
  const { data: stats } = useGetStats();

  return (
    <section className="relative" data-testid="stats-section">
      {/* Neon lime accent stripe */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(200,250,72,0.3)] to-transparent" />
      <div className="bg-[var(--wm-surface)] py-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
            {(stats ?? []).map((stat, i) => (
              <StatItem key={stat.id} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(200,250,72,0.3)] to-transparent" />
    </section>
  );
}
