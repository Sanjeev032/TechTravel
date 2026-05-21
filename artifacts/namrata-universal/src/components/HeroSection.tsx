import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useGetHero } from "@workspace/api-client-react";
import { useParallax } from "@/hooks/useParallax";
import { useMagnetic } from "@/hooks/useMagnetic";
import { EASE, DUR, STAGGER } from "@/lib/gsap-presets";

/** WM-style floating tech tag pill */
interface FloatingTagProps {
  tag: string;
  pos: string;
  delay: number;
  speed: number;
}
function FloatingTag({ tag, pos, delay, speed }: FloatingTagProps) {
  const ref = useParallax<HTMLDivElement>({ speed, start: "top top", end: "bottom top" });
  return (
    <div
      ref={ref}
      className={`absolute hidden lg:block ${pos} select-none pointer-events-none`}
    >
      <span
        className="wm-glass wm-label px-3 py-1.5 rounded-full text-[var(--wm-lime)] border border-[rgba(200,250,72,0.2)] animate-float"
        style={{ animationDelay: `${delay}s` }}
      >
        {tag}
      </span>
    </div>
  );
}

export default function HeroSection() {
  const { data: hero } = useGetHero();
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; alpha: number }> = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.25 + 0.05,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 250, 72, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // GSAP hero intro timeline — split chars
  useGSAP(() => {
    if (!hero || !headingRef.current) return;

    const heading = headingRef.current;
    const tl = gsap.timeline({ defaults: { ease: EASE.cinematic } });

    // Animate chars already split by the DOM structure
    tl.to(".hero-char", {
      y: "0%",
      duration: DUR.hero,
      stagger: STAGGER.chars,
    })
    .from(".hero-sub-anim", {
      opacity: 0,
      y: 24,
      duration: DUR.md,
      stagger: 0.1,
    }, "-=0.8")
    .from(".hero-badge", {
      opacity: 0,
      scale: 0.85,
      duration: DUR.sm,
    }, "-=1");
  }, { scope: containerRef, dependencies: [hero] });

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const primaryRef = useMagnetic<HTMLButtonElement>({ strength: 0.2 });
  const secondaryRef = useMagnetic<HTMLButtonElement>({ strength: 0.15 });

  /** Split text into per-character spans for GSAP animation */
  const renderSplitText = (text: string, extraClass = "") => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className={`hero-char inline-block will-change-transform ${extraClass}`}
        style={{ transform: "translateY(110%)" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const titleWords = (hero?.title ?? "We Build Digital").split(" ");
  const highlightWords = (hero?.titleHighlight ?? "Excellence").split(" ");

  const POSITIONS = [
    "top-24 left-[8%]", "top-32 right-[9%]", "top-[38%] left-[3%]",
    "top-[48%] right-[4%]", "bottom-[30%] left-[12%]", "bottom-[24%] right-[8%]",
    "top-[22%] left-[20%]", "top-20 right-[25%]",
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080a0e]"
    >
      {/* Subtle particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40"
      />

      {/* Ambient radial orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vh] bg-[radial-gradient(ellipse_at_top_left,rgba(82,143,129,0.12)_0%,transparent_65%)]" />
        <div className="absolute top-0 right-0 w-[50vw] h-[55vh] bg-[radial-gradient(ellipse_at_top_right,rgba(200,250,72,0.07)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-[radial-gradient(ellipse_at_bottom,rgba(82,143,129,0.06)_0%,transparent_65%)]" />
      </div>

      {/* Floating tech tags */}
      {hero?.floatingTags?.map((tag, i) => (
        <FloatingTag
          key={tag}
          tag={tag}
          pos={POSITIONS[i % POSITIONS.length]}
          delay={(i * 0.4) % 4}
          speed={0.04 + (i % 3) * 0.05}
        />
      ))}

      {/* Main content */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 text-center pt-24 pb-20">

        {/* Badge */}
        <div className="hero-badge opacity-0 inline-flex items-center gap-2 mb-10">
          <span className="wm-glass wm-label pl-2 pr-4 py-1.5 rounded-full text-[var(--wm-lime)] border border-[rgba(200,250,72,0.18)] flex items-center gap-3">
            <img src="https://avatars.githubusercontent.com/u/131547820?v=4" alt="Sanjeev Kumar" className="w-5 h-5 rounded-full object-cover grayscale" />
            {hero?.badge?.text ?? "Trusted by 500+ Businesses Worldwide"}
          </span>
        </div>

        {/* Headline — WM giant uppercase split-char reveal */}
        <h1
          ref={headingRef}
          className="wm-h1 text-foreground mb-6"
          data-testid="hero-title"
        >
          {titleWords.map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden py-1 mr-[0.15em] last:mr-0">
              {renderSplitText(word)}
            </span>
          ))}
          {" "}
          {highlightWords.map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden py-1 mr-[0.15em] last:mr-0">
              {renderSplitText(word, "wm-gradient-text")}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="hero-sub-anim wm-h3 text-muted-foreground max-w-lg mx-auto mb-4 tracking-tight">
          {hero?.subtitle ?? "Software Solutions That Scale"}
        </p>

        {/* Description */}
        <p className="hero-sub-anim wm-body text-muted-foreground max-w-md mx-auto mb-12">
          {hero?.description ?? "Premium software engineering for ambitious businesses."}
        </p>

        {/* CTAs — WM pill buttons */}
        <div className="hero-sub-anim flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            ref={primaryRef}
            onClick={() => handleClick(hero?.primaryCtaHref ?? "#contact")}
            className="wm-btn wm-btn-primary"
            id="hero-primary-cta"
          >
            <span>{hero?.primaryCtaLabel ?? "Start Your Project"}</span>
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#080a0e]/20">
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </span>
          </button>

          <button
            ref={secondaryRef}
            onClick={() => handleClick(hero?.secondaryCtaHref ?? "#projects")}
            className="wm-btn"
            id="hero-secondary-cta"
          >
            <span>{hero?.secondaryCtaLabel ?? "View Our Work"}</span>
            <span className="wm-btn-icon">
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="wm-label text-muted-foreground">Scroll</span>
        <ChevronDown size={16} className="text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
}
