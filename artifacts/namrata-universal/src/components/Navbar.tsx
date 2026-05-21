import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useGetNavbar } from "@workspace/api-client-react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useLocation } from "wouter";
import gsap from "gsap";
import { EASE } from "@/lib/gsap-presets";

/** WM-style underline hover nav link */
function NavLink({ label, href, onClick }: { label: string; href: string; onClick: () => void }) {
  const ref = useMagnetic<HTMLButtonElement>({ strength: 0.2 });
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="wm-nav-link wm-label px-1 py-2"
      data-testid={`nav-item-${label.toLowerCase()}`}
    >
      {label}
    </button>
  );
}

/** WM-style pill CTA — neon lime icon on right */
function NavCTA({ label, onClick }: { label: string; onClick: () => void }) {
  const ref = useMagnetic<HTMLButtonElement>({ strength: 0.15 });
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="wm-btn"
      data-testid="nav-cta"
    >
      <span>{label}</span>
      <span className="wm-btn-icon">
        <ArrowUpRight size={13} strokeWidth={2.5} />
      </span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: navbar } = useGetNavbar();
  const navRef = useRef<HTMLElement>(null);
  const [location, navigate] = useLocation();
  const isTravel = location === "/travel";

  // Initial mount animation
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    gsap.fromTo(el, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: EASE.cinematic, delay: 0.1 });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href === "/travel") {
      navigate("/travel");
      return;
    }
    if (href.startsWith("#")) {
      if (location !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-[#080a0e]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2 group"
            data-testid="nav-logo"
          >
            {/* WM-style logo: small accent square + brand name */}
            <div className="w-6 h-6 rounded bg-[var(--wm-lime)] flex items-center justify-center shrink-0">
              <span className="text-[#080a0e] font-bold text-xs leading-none">M</span>
            </div>
            <span className="wm-h3 text-sm tracking-tight text-foreground">
              {navbar?.logoText ?? "Mishra Travels"}
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navbar?.items?.map((item) => (
              <NavLink
                key={item.href}
                label={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
              />
            ))}
            {/* Travel — hardcoded, not API-driven */}
            <button
              onClick={() => handleNavClick("/travel")}
              className={`wm-nav-link wm-label px-1 py-2 ${isTravel ? "text-[var(--wm-lime)]" : ""}`}
              data-testid="nav-item-travel"
            >
              Travel
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <NavCTA
              label={navbar?.ctaLabel ?? "Get a Quote"}
              onClick={() => handleNavClick(navbar?.ctaHref ?? "#contact")}
            />
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="nav-mobile-toggle"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — full-screen overlay WM style */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-white/5 bg-[#080a0e]/98 backdrop-blur-xl"
            data-testid="nav-mobile-menu"
          >
            <div className="px-5 pt-4 pb-8 flex flex-col gap-1">
              {navbar?.items?.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left py-3 wm-h3 text-foreground/70 hover:text-foreground transition-colors border-b border-white/5"
                  data-testid={`mobile-nav-item-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </motion.button>
              ))}
              {/* Travel — hardcoded */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navbar?.items?.length ?? 5) * 0.07, duration: 0.3 }}
                onClick={() => handleNavClick("/travel")}
                className={`text-left py-3 wm-h3 transition-colors border-b border-white/5 ${isTravel ? "text-[var(--wm-lime)]" : "text-foreground/70 hover:text-foreground"}`}
                data-testid="mobile-nav-item-travel"
              >
                Travel
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                onClick={() => handleNavClick(navbar?.ctaHref ?? "#contact")}
                className="mt-6 flex items-center justify-between w-full px-5 py-3.5 rounded-full border border-white/10 text-foreground wm-body font-medium"
                data-testid="mobile-nav-cta"
              >
                <span>{navbar?.ctaLabel ?? "Get a Quote"}</span>
                <span className="wm-btn-icon">
                  <ArrowUpRight size={13} strokeWidth={2.5} />
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
