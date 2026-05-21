import { useGetTechnologies } from "@workspace/api-client-react";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useTextReveal } from "@/hooks/useTextReveal";

export default function TechSection() {
  const { data: techs } = useGetTechnologies();

  const labelRef = useRevealAnimation<HTMLDivElement>({ direction: "up" });
  const headingRef = useTextReveal<HTMLHeadingElement>({ type: "words" });

  const half = Math.ceil((techs?.length ?? 0) / 2);
  const row1 = techs?.slice(0, half) ?? [];
  const row2 = techs?.slice(half) ?? [];

  const TechChip = ({ tech }: { tech: { id: number; name: string; logoUrl: string; category: string } }) => (
    <div className="flex items-center gap-3 wm-card px-5 py-3 mx-3 shrink-0 transition-colors duration-300 hover:border-[rgba(200,250,72,0.25)]">
      <img
        src={tech.logoUrl}
        alt={tech.name}
        className="w-6 h-6 object-contain opacity-80"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <span className="wm-body text-foreground/80 whitespace-nowrap">{tech.name}</span>
    </div>
  );

  return (
    <section id="technologies" className="wm-section overflow-hidden" data-testid="tech-section">
      <div className="wm-separator mb-16" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12">
        <div className="max-w-2xl">
          <div ref={labelRef} className="wm-section-label wm-label text-muted-foreground mb-5">Our Stack</div>
          <h2 ref={headingRef} className="wm-h2 text-foreground">
            Technologies We Master
          </h2>
        </div>
      </div>

      {/* Row 1 */}
      <div className="relative mb-3">
        <div className="flex">
          <div className="flex animate-marquee">
            {[...row1, ...row1].map((t, i) => <TechChip key={`r1-${t.id}-${i}`} tech={t} />)}
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>

      {/* Row 2 */}
      <div className="relative">
        <div className="flex">
          <div className="flex animate-marquee-reverse">
            {[...row2, ...row2].map((t, i) => <TechChip key={`r2-${t.id}-${i}`} tech={t} />)}
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
