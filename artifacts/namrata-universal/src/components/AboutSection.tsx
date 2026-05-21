import { useRef, useEffect } from "react";
import { CheckCircle2, Target, Eye } from "lucide-react";
import { useGetAbout } from "@workspace/api-client-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useTextReveal } from "@/hooks/useTextReveal";
import { EASE } from "@/lib/gsap-presets";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function StatCard({
  stat,
  index,
}: {
  stat: { value: number; suffix: string; label: string; color: string };
  index: number;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  const cardRef = useRevealAnimation<HTMLDivElement>({
    direction: "up",
    distance: 30,
    delay: index * 0.1,
    start: "top 90%",
  });

  useEffect(() => {
    const card = cardRef.current;
    const numEl = numRef.current;
    if (!card || !numEl) return;
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
        onUpdate: () => { numEl.innerText = Math.floor(obj.val).toString(); },
      });
    }, card);
    return () => ctx.revert();
  }, [stat.value, cardRef]);

  return (
    <div ref={cardRef} className="wm-card p-8 flex flex-col items-center text-center aspect-square justify-center" data-testid={`about-stat-${index}`}>
      <div className={`counter-number text-5xl md:text-6xl font-light bg-gradient-to-br ${stat.color} text-transparent bg-clip-text mb-3`}>
        <span ref={numRef}>0</span>{stat.suffix}
      </div>
      <p className="wm-label text-muted-foreground whitespace-pre-line leading-tight">{stat.label}</p>
    </div>
  );
}

export default function AboutSection() {
  const { data: about } = useGetAbout();

  const labelRef = useRevealAnimation<HTMLDivElement>({ direction: "up" });
  const headingRef = useTextReveal<HTMLHeadingElement>({ type: "words" });
  const bodyRef = useRevealAnimation<HTMLDivElement>({
    childSelector: ".about-item",
    stagger: 0.12,
    direction: "up",
    start: "top 85%",
  });

  return (
    <section id="about" className="wm-section relative" data-testid="about-section">
      <div className="wm-separator mb-16" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_60%,rgba(82,143,129,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div ref={labelRef} className="wm-section-label wm-label text-muted-foreground mb-5">
              {about?.sectionTag ?? "Who We Are"}
            </div>
            <h2 ref={headingRef} className="wm-h2 text-foreground mb-8">
              {about?.title ?? "Engineering the Future"}{" "}
              <span className="wm-gradient-text">{about?.titleHighlight ?? "One Solution at a Time"}</span>
            </h2>

            <div ref={bodyRef} className="space-y-5">
              <p className="about-item wm-body text-muted-foreground leading-relaxed">{about?.description}</p>

              {/* Mission & Vision */}
              {[
                { icon: Target, title: "Our Mission", text: about?.mission },
                { icon: Eye, title: "Our Vision", text: about?.vision },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="about-item wm-card p-5 flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--wm-lime)]/20 to-[var(--wm-lime)]/5 border border-[var(--wm-lime)]/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[var(--wm-lime)]" />
                  </div>
                  <div>
                    <h4 className="wm-h3 text-foreground mb-1 text-sm">{title}</h4>
                    <p className="wm-body text-muted-foreground text-xs leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}

              {/* Highlights */}
              <div className="about-item grid grid-cols-1 sm:grid-cols-2 gap-2">
                {about?.highlights?.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 wm-body text-muted-foreground text-sm" data-testid={`about-highlight-${i}`}>
                    <CheckCircle2 size={13} className="text-[var(--wm-lime)] shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: about?.yearsOfExperience ?? 12, suffix: "+", label: "Years of\nExperience", color: "from-[var(--wm-lime)] to-emerald-400" },
              { value: about?.clientsSatisfied ?? 500, suffix: "+", label: "Happy\nClients", color: "from-blue-400 to-teal-500" },
              { value: about?.projectsCompleted ?? 1200, suffix: "+", label: "Projects\nDelivered", color: "from-violet-400 to-purple-600" },
              { value: 99, suffix: "%", label: "Client\nRetention", color: "from-orange-400 to-rose-500" },
            ].map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
