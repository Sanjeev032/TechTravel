import { useRef, useState, useEffect } from "react";
import {
  Globe, Smartphone, Cloud, Database, Brain, ShieldCheck,
  ArrowUpRight, Layers, Code2, Cpu, BarChart3,
} from "lucide-react";
import { useGetServices } from "@workspace/api-client-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useTextReveal } from "@/hooks/useTextReveal";
import { EASE, DUR } from "@/lib/gsap-presets";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Globe, Smartphone, Cloud, Database, Brain, ShieldCheck, Layers, Code2, Cpu, BarChart3,
};

/** WM-style tilt-on-hover service card */
function ServiceCard({
  service,
  index,
}: {
  service: { id: number; title: string; description: string; icon: string; color?: string; features: string[] };
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const Icon = ICONS[service.icon] ?? Globe;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(card, {
        rotateX: (y / rect.height) * -8,
        rotateY: (x / rect.width) * 8,
        transformPerspective: 1000,
        duration: 0.5,
        ease: EASE.out,
        overwrite: "auto",
      });
    };
    const onLeave = () => {
      setHovered(false);
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: EASE.elastic,
        overwrite: "auto",
      });
    };
    const onEnter = () => setHovered(true);

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    card.addEventListener("mouseenter", onEnter);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
      card.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`wm-card group relative p-6 will-change-transform cursor-default`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Top accent bar — neon lime on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-[var(--wm-lime)] transition-transform duration-500 origin-left"
        style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)" }}
      />

      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 transition-transform duration-300 ${hovered ? "scale-110" : ""}`}>
        <Icon size={18} className="text-white" />
      </div>

      {/* Number label */}
      <div className="wm-label text-muted-foreground mb-3">
        {String(index + 1).padStart(2, "0")}
      </div>

      <h3 className="wm-h3 text-foreground mb-3">{service.title}</h3>
      <p className="wm-body text-muted-foreground mb-5 line-clamp-3">{service.description}</p>

      {/* Features */}
      <ul className="space-y-1.5 mb-5">
        {service.features.slice(0, 3).map((f, fi) => (
          <li key={fi} className="flex items-center gap-2 wm-body text-muted-foreground">
            <span className="w-1 h-1 rounded-full bg-[var(--wm-lime)] shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {/* Learn more link */}
      <div className={`flex items-center gap-1.5 wm-label text-[var(--wm-lime)] transition-all duration-200 ${hovered ? "translate-x-1" : ""}`}>
        Learn more
        <ArrowUpRight size={12} />
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { data: services } = useGetServices();

  const labelRef = useRevealAnimation<HTMLDivElement>({ direction: "up", delay: 0.1 });
  const headingRef = useTextReveal<HTMLHeadingElement>({ type: "words", start: "top 85%" });
  const gridRef = useRevealAnimation<HTMLDivElement>({
    childSelector: ".service-card-wrap",
    stagger: { amount: 0.5, from: "start" },
    direction: "up",
    distance: 50,
    start: "top 80%",
  });

  return (
    <section
      id="services"
      className="wm-section relative overflow-hidden"
      data-testid="services-section"
    >
      {/* Subtle top separator */}
      <div className="wm-separator mb-16 md:mb-24" />

      {/* Grid pattern bg */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(200,250,72,1) 1px,transparent 1px),linear-gradient(90deg,rgba(200,250,72,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        {/* Header — WM label + heading */}
        <div className="max-w-2xl mb-16">
          <div ref={labelRef} className="wm-section-label wm-label text-muted-foreground mb-5">
            What We Do
          </div>
          <h2 ref={headingRef} className="wm-h2 text-foreground">
            Services That Drive Results
          </h2>
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {(services ?? []).map((service, i) => (
            <div key={service.id} className="service-card-wrap">
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex justify-center">
          <button
            className="wm-btn"
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Discuss Your Project</span>
            <span className="wm-btn-icon">
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
