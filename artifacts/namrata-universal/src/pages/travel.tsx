import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin, Clock, Star, Check, ChevronDown, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useParallax } from "@/hooks/useParallax";
import { useMagnetic } from "@/hooks/useMagnetic";
import { EASE, DUR, STAGGER } from "@/lib/gsap-presets";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const DESTINATIONS = [
  {
    id: 1,
    name: "Bali, Indonesia",
    tagline: "Island of the Gods",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=70",
    duration: "7 nights",
    rating: 4.9,
    reviews: 248,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Santorini, Greece",
    tagline: "Aegean Dream",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=500&q=70",
    duration: "6 nights",
    rating: 4.8,
    reviews: 192,
    badge: "Trending",
  },
  {
    id: 3,
    name: "Maldives",
    tagline: "Paradise on Earth",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=500&q=70",
    duration: "5 nights",
    rating: 5.0,
    reviews: 317,
    badge: "Luxury",
  },
  {
    id: 4,
    name: "Kyoto, Japan",
    tagline: "Ancient Serenity",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=70",
    duration: "8 nights",
    rating: 4.7,
    reviews: 183,
    badge: "Cultural",
  },
  {
    id: 5,
    name: "Swiss Alps",
    tagline: "Peaks & Solitude",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=70",
    duration: "7 nights",
    rating: 4.8,
    reviews: 156,
    badge: "Adventure",
  },
  {
    id: 6,
    name: "Dubai, UAE",
    tagline: "Where Luxury Lives",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=70",
    duration: "5 nights",
    rating: 4.9,
    reviews: 271,
    badge: "Premium",
  },
];

const PACKAGES = [
  {
    id: 1,
    tier: "Silver",
    tagline: "Explore in Comfort",
    price: 45000,
    currency: "₹",
    duration: "5 Days / 4 Nights",
    destinations: ["Goa", "Munnar", "Ooty"],
    hotel: "3-Star Boutique Hotels",
    meals: "Breakfast included",
    transport: "AC Cab",
    activities: ["City tours", "Beach visits", "Nature walks", "Local sightseeing"],
    accent: "from-zinc-700 to-zinc-600",
    badge: "bg-zinc-600",
    popular: false,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=70",
  },
  {
    id: 2,
    tier: "Gold",
    tagline: "Travel in Style",
    price: 89000,
    currency: "₹",
    duration: "8 Days / 7 Nights",
    destinations: ["Bali", "Singapore", "Kuala Lumpur"],
    hotel: "5-Star Hotels",
    meals: "Breakfast & Dinner",
    transport: "Business Class Flights",
    activities: ["Private island tour", "Temple visits", "Spa sessions", "Sunset dinner", "City safari", "Water sports"],
    accent: "from-amber-700 to-amber-500",
    badge: "bg-amber-600",
    popular: true,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=70",
  },
  {
    id: 3,
    tier: "Platinum",
    tagline: "The Ultimate Journey",
    price: 150000,
    currency: "₹",
    duration: "12 Days / 11 Nights",
    destinations: ["Maldives", "Santorini", "Dubai"],
    hotel: "Overwater Bungalows & 7-Star Resorts",
    meals: "All-inclusive",
    transport: "First Class Flights + Private Transfers",
    activities: [
      "Private yacht cruise",
      "Helicopter tour",
      "Michelin-star dining",
      "Personal concierge",
      "Scuba diving",
      "Desert safari",
      "Hot air balloon",
      "Exclusive spa retreat",
    ],
    accent: "from-slate-600 to-slate-400",
    badge: "bg-[var(--wm-lime)]",
    popular: false,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=500&q=70",
  },
];

const STATS = [
  { value: "50K+", label: "Happy Travellers" },
  { value: "120+", label: "Destinations" },
  { value: "15", label: "Years of Excellence" },
  { value: "4.9★", label: "Average Rating" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Hero section with full-bleed parallax image */
function TravelHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useParallax<HTMLDivElement>({ speed: 0.12, start: "top top", end: "bottom top" });

  useGSAP(() => {
    if (!headingRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: EASE.cinematic } });
    tl.to(".travel-hero-char", { y: "0%", duration: DUR.hero, stagger: STAGGER.chars })
      .from(".travel-hero-sub", { opacity: 0, y: 20, duration: DUR.md, stagger: 0.1 }, "-=0.9");
  }, { scope: containerRef });

  const heroWords = ["Discover", "The", "World"];
  const accentWords = ["In Style"];

  const renderChars = (text: string, cls = "") =>
    text.split("").map((c, i) => (
      <span
        key={i}
        className={`travel-hero-char inline-block will-change-transform ${cls}`}
        style={{ transform: "translateY(110%)" }}
      >
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <section className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
      {/* Parallax background image */}
      <div ref={imgRef} className="absolute inset-0 scale-110 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=75"
          alt="Luxury travel hero"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e] via-[#080a0e]/40 to-transparent" />
      </div>

      {/* Content */}
      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-20 w-full">
        <div className="travel-hero-sub mb-4">
          <span className="wm-glass wm-label px-4 py-1.5 rounded-full text-[var(--wm-lime)] border border-[rgba(200,250,72,0.18)]">
            Premium Travel Experiences
          </span>
        </div>

        <h1 ref={headingRef} className="wm-h1 text-white mb-6" style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}>
          {heroWords.map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden py-1 mr-[0.15em]">
              {renderChars(word)}
            </span>
          ))}
          <br />
          {accentWords.map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden py-1 mr-[0.15em]">
              {renderChars(word, "text-[var(--wm-lime)]")}
            </span>
          ))}
        </h1>

        <p className="travel-hero-sub wm-body text-white/60 max-w-md mb-10 text-base">
          Curated luxury travel experiences crafted for the discerning explorer. Every journey, a masterpiece.
        </p>

        <div className="travel-hero-sub flex flex-wrap gap-3">
          <button
            className="wm-btn"
            style={{ background: "var(--wm-lime)", borderColor: "var(--wm-lime)", color: "#080a0e" }}
            onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span>Explore Packages</span>
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#080a0e]/20">
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </span>
          </button>
          <button
            className="wm-btn"
            onClick={() => document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span>View Destinations</span>
            <span className="wm-btn-icon"><ArrowUpRight size={13} strokeWidth={2.5} /></span>
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 z-10">
        <span className="wm-label text-white text-[0.6rem]">Scroll</span>
        <ChevronDown size={14} className="text-white animate-bounce" />
      </div>
    </section>
  );
}

/** Stats strip */
function TravelStats() {
  const ref = useRevealAnimation<HTMLDivElement>({
    childSelector: ".travel-stat",
    stagger: 0.1,
    direction: "up",
    start: "top 90%",
  });

  return (
    <section className="bg-[var(--wm-surface)] border-y border-white/[0.05]">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06]">
        {STATS.map((s) => (
          <div key={s.label} className="travel-stat text-center px-6 py-8">
            <div className="counter-number text-3xl md:text-4xl font-light text-[var(--wm-lime)] mb-1">{s.value}</div>
            <p className="wm-label text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Destination card */
function DestinationCard({ dest, index }: { dest: typeof DESTINATIONS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="group relative wm-card overflow-hidden cursor-pointer aspect-[3/4]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={dest.image}
        alt={dest.name}
        className="w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e]/90 via-[#080a0e]/20 to-transparent" />

      {/* Badge */}
      <div className="absolute top-4 left-4">
        <span className="wm-label px-2.5 py-1 rounded-full bg-[var(--wm-lime)] text-[#080a0e]">{dest.badge}</span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-1 wm-label text-[var(--wm-lime)] mb-1">
          <MapPin size={10} />
          <span>{dest.name}</span>
        </div>
        <h3 className="wm-h3 text-white mb-2">{dest.tagline}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 wm-label text-white/60">
            <Clock size={10} /> {dest.duration}
          </div>
          <div className="flex items-center gap-1 wm-label text-white/60">
            <Star size={10} className="fill-[var(--wm-lime)] text-[var(--wm-lime)]" />
            <span className="text-[var(--wm-lime)]">{dest.rating}</span>
            <span>({dest.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Destination grid section */
function DestinationGrid() {
  const labelRef = useRevealAnimation<HTMLDivElement>({ direction: "up" });
  const headingRef = useTextReveal<HTMLHeadingElement>({ type: "words" });
  const gridRef = useRevealAnimation<HTMLDivElement>({
    childSelector: ".dest-card",
    stagger: { amount: 0.5, from: "start" },
    direction: "up",
    distance: 50,
    start: "top 80%",
  });

  return (
    <section id="destinations" className="wm-section">
      <div className="wm-separator mb-16" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div className="max-w-2xl">
            <div ref={labelRef} className="wm-section-label wm-label text-muted-foreground mb-5">
              Destinations
            </div>
            <h2 ref={headingRef} className="wm-h2 text-foreground">
              Handpicked For You
            </h2>
          </div>
          <button className="wm-btn shrink-0">
            <span>All Destinations</span>
            <span className="wm-btn-icon"><ArrowUpRight size={13} strokeWidth={2.5} /></span>
          </button>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DESTINATIONS.map((dest, i) => (
            <div key={dest.id} className="dest-card">
              <DestinationCard dest={dest} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Package card */
function PackageCard({ pkg, index }: { pkg: typeof PACKAGES[0]; index: number }) {
  const isPlatinum = pkg.tier === "Platinum";
  const isGold = pkg.tier === "Gold";
  const ref = useMagnetic<HTMLDivElement>({ strength: 0.06 });

  return (
    <div
      ref={ref}
      className={`relative wm-card overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 ${
        isGold ? "ring-1 ring-amber-500/30" : ""
      } ${isPlatinum ? "ring-1 ring-[var(--wm-lime)]/25" : ""}`}
    >
      {/* Popular badge */}
      {isGold && (
        <div className="absolute top-4 right-4 z-10">
          <span className="wm-label px-2.5 py-1 rounded-full bg-amber-500 text-white">Most Popular</span>
        </div>
      )}
      {isPlatinum && (
        <div className="absolute top-4 right-4 z-10">
          <span className="wm-label px-2.5 py-1 rounded-full bg-[var(--wm-lime)] text-[#080a0e]">Ultimate</span>
        </div>
      )}

      {/* Card image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.tier}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e] to-transparent" />
        <div className="absolute bottom-4 left-5">
          <div className={`wm-label px-3 py-1 rounded-full bg-gradient-to-r ${pkg.accent} text-white`}>
            {pkg.tier} Package
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Price */}
        <div className="mb-5">
          <p className="wm-label text-muted-foreground mb-1">{pkg.tagline}</p>
          <div className="flex items-baseline gap-1">
            <span className="wm-label text-muted-foreground text-lg">{pkg.currency}</span>
            <span className="counter-number text-4xl font-light text-foreground">
              {pkg.price.toLocaleString("en-IN")}
            </span>
            <span className="wm-label text-muted-foreground">/person</span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center gap-3 wm-body text-sm">
            <Clock size={13} className="text-[var(--wm-lime)] shrink-0" />
            <span className="text-muted-foreground">{pkg.duration}</span>
          </div>
          <div className="flex items-start gap-3 wm-body text-sm">
            <MapPin size={13} className="text-[var(--wm-lime)] shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{pkg.destinations.join(" · ")}</span>
          </div>
          <div className="flex items-center gap-3 wm-body text-sm">
            <Globe size={13} className="text-[var(--wm-lime)] shrink-0" />
            <span className="text-muted-foreground">{pkg.transport}</span>
          </div>

          {/* Divider */}
          <div className="wm-separator my-4" />

          {/* Activities */}
          <div>
            <p className="wm-label text-muted-foreground mb-2">Includes</p>
            <ul className="space-y-1.5">
              {pkg.activities.slice(0, 4).map((a) => (
                <li key={a} className="flex items-center gap-2 wm-body text-xs text-muted-foreground">
                  <Check size={11} className="text-[var(--wm-lime)] shrink-0" />
                  {a}
                </li>
              ))}
              {pkg.activities.length > 4 && (
                <li className="wm-label text-[var(--wm-lime)] text-xs pl-5">
                  +{pkg.activities.length - 4} more activities
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <button
          className="wm-btn w-full justify-center"
          style={
            isPlatinum
              ? { background: "var(--wm-lime)", borderColor: "var(--wm-lime)", color: "#080a0e" }
              : isGold
              ? { background: "rgb(217 119 6)", borderColor: "rgb(217 119 6)", color: "#fff" }
              : {}
          }
        >
          <span>Book {pkg.tier} Package</span>
          <span className={`flex items-center justify-center w-7 h-7 rounded-full ${
            isPlatinum ? "bg-[#080a0e]/20" : isGold ? "bg-white/20" : "bg-[var(--wm-lime)]"
          }`}>
            <ArrowUpRight size={13} strokeWidth={2.5} className={isPlatinum || isGold ? "" : "text-[#080a0e]"} />
          </span>
        </button>
      </div>
    </div>
  );
}

/** Packages section */
function PackagesSection() {
  const labelRef = useRevealAnimation<HTMLDivElement>({ direction: "up" });
  const headingRef = useTextReveal<HTMLHeadingElement>({ type: "words" });
  const gridRef = useRevealAnimation<HTMLDivElement>({
    childSelector: ".pkg-card",
    stagger: { amount: 0.4, from: "start" },
    direction: "up",
    distance: 50,
    start: "top 78%",
  });

  return (
    <section id="packages" className="wm-section bg-[var(--wm-surface)]">
      <div className="wm-separator mb-16" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-14">
          <div ref={labelRef} className="wm-section-label wm-label text-muted-foreground mb-5">
            Packages
          </div>
          <h2 ref={headingRef} className="wm-h2 text-foreground">
            Choose Your Journey
          </h2>
          <p className="wm-body text-muted-foreground mt-4">
            Three tiers of curated travel excellence. Every package crafted for a different kind of adventurer.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <div key={pkg.id} className="pkg-card">
              <PackageCard pkg={pkg} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** CTA section */
function TravelCTA() {
  const ref = useRevealAnimation<HTMLDivElement>({ direction: "up", start: "top 85%" });
  const btn1 = useMagnetic<HTMLButtonElement>({ strength: 0.18 });
  const btn2 = useMagnetic<HTMLButtonElement>({ strength: 0.15 });

  return (
    <section className="wm-section relative overflow-hidden">
      <div className="wm-separator mb-0" />
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=70"
          alt="CTA background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#080a0e]/80 backdrop-blur-[2px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <span className="wm-label text-[var(--wm-lime)] mb-5 block">Start Planning Today</span>
        <h2 className="wm-h2 text-white mb-6">
          Your Dream Trip Is<br />
          <span className="text-[var(--wm-lime)]">One Step Away</span>
        </h2>
        <p className="wm-body text-white/60 max-w-lg mx-auto mb-10">
          Let our travel experts design the perfect itinerary for you. Personalized, premium, and unforgettable.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            ref={btn1}
            className="wm-btn"
            style={{ background: "var(--wm-lime)", borderColor: "var(--wm-lime)", color: "#080a0e" }}
            onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span>Plan My Trip</span>
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#080a0e]/20">
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </span>
          </button>
          <button ref={btn2} className="wm-btn">
            <span>Talk to an Expert</span>
            <span className="wm-btn-icon"><ArrowUpRight size={13} strokeWidth={2.5} /></span>
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Travel() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Refresh ScrollTrigger after navigation
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <TravelHero />
      <TravelStats />
      <DestinationGrid />
      <PackagesSection />
      <TravelCTA />

      {/* Footer strip */}
      <div className="border-t border-white/[0.05] py-6">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between flex-wrap gap-3">
          <p className="wm-body text-xs text-muted-foreground">
            © 2024 Mishra Travels. All rights reserved.
          </p>
          <button
            className="wm-label text-muted-foreground hover:text-[var(--wm-lime)] transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </div>
  );
}
