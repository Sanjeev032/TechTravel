import { Linkedin, Twitter } from "lucide-react";
import { useGetTeam } from "@workspace/api-client-react";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useTextReveal } from "@/hooks/useTextReveal";

export default function TeamSection() {
  const { data: team } = useGetTeam();

  const labelRef = useRevealAnimation<HTMLDivElement>({ direction: "up" });
  const headingRef = useTextReveal<HTMLHeadingElement>({ type: "words" });
  const gridRef = useRevealAnimation<HTMLDivElement>({
    childSelector: ".team-card",
    stagger: { amount: 0.4, from: "start" },
    direction: "up",
    distance: 40,
    start: "top 82%",
  });

  return (
    <section id="team" className="wm-section" data-testid="team-section">
      <div className="wm-separator mb-16" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-14">
          <div ref={labelRef} className="wm-section-label wm-label text-muted-foreground mb-5">The Team</div>
          <h2 ref={headingRef} className="wm-h2 text-foreground">
            Minds Behind the Magic
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(team ?? []).map((member) => (
            <div
              key={member.id}
              className="team-card group wm-card overflow-hidden hover:-translate-y-1 transition-transform duration-400"
              data-testid={`team-card-${member.id}`}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e]/90 via-transparent to-transparent" />
                {/* Social icons */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-[var(--wm-lime)] hover:text-[#080a0e] transition-colors"
                      data-testid={`team-linkedin-${member.id}`}>
                      <Linkedin size={13} />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-[var(--wm-lime)] hover:text-[#080a0e] transition-colors"
                      data-testid={`team-twitter-${member.id}`}>
                      <Twitter size={13} />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-5">
                <h3 className="wm-h3 text-foreground mb-0.5">{member.name}</h3>
                <p className="wm-label text-[var(--wm-lime)] mb-2">{member.role}</p>
                <p className="wm-body text-muted-foreground text-xs leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
