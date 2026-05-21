import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Github, Instagram, Youtube, ArrowUpRight, Send } from "lucide-react";
import { useGetFooter } from "@workspace/api-client-react";
import { useTextReveal } from "@/hooks/useTextReveal";

const SOCIAL_ICONS: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Linkedin, Twitter, Github, Instagram, Youtube,
};

export default function FooterSection() {
  const { data: footer } = useGetFooter();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Massive brand marquee text
  const brandName = footer?.logoText ?? "Namrata Universal";

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/[0.05]" data-testid="footer-section">
      {/* Ambient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(200,250,72,0.2)] to-transparent" />

      {/* ── WONDER MAKERS SIGNATURE: Oversized brand name marquee ── */}
      <div className="overflow-hidden py-8 border-b border-white/[0.05]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="wm-marquee-text text-white/[0.04] mx-8 shrink-0">
              {brandName}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded bg-[var(--wm-lime)] flex items-center justify-center shrink-0">
                <span className="text-[#080a0e] font-bold text-xs">N</span>
              </div>
              <span className="wm-h3 text-sm text-foreground tracking-tight">
                {footer?.logoText ?? "Namrata Universal"}
              </span>
            </div>
            <p className="wm-body text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              {footer?.description}
            </p>
            <div className="flex gap-2.5">
              {footer?.socials?.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon] ?? Linkedin;
                return (
                  <motion.a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="w-9 h-9 rounded-lg wm-card flex items-center justify-center text-muted-foreground hover:text-[var(--wm-lime)] hover:border-[rgba(200,250,72,0.25)] transition-colors"
                    data-testid={`footer-social-${social.platform.toLowerCase()}`}
                  >
                    <Icon size={15} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {footer?.columns?.map((col) => (
            <div key={col.title}>
              <h4 className="wm-label text-foreground/60 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="wm-body text-sm text-muted-foreground hover:text-[var(--wm-lime)] transition-colors text-left"
                      data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="wm-card p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="wm-h3 text-foreground mb-1 text-base">{footer?.newsletterTitle ?? "Stay in the Loop"}</h4>
              <p className="wm-body text-muted-foreground text-sm">{footer?.newsletterDescription}</p>
            </div>
            {subscribed ? (
              <div className="wm-label text-[var(--wm-lime)] shrink-0">Subscribed! ✓</div>
            ) : (
              <div className="flex w-full md:w-auto gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 md:w-60 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] wm-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[rgba(200,250,72,0.4)] transition-all"
                  data-testid="input-newsletter-email"
                />
                <button
                  onClick={() => { if (email) setSubscribed(true); }}
                  className="wm-btn shrink-0"
                  style={{ background: "var(--wm-lime)", borderColor: "var(--wm-lime)", color: "#080a0e" }}
                  data-testid="button-newsletter-subscribe"
                >
                  <Send size={14} />
                  <span>Subscribe</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/[0.05] pt-8">
          <p className="wm-body text-muted-foreground text-xs">{footer?.copyright}</p>
          <div className="flex gap-5 wm-body text-xs text-muted-foreground">
            <button className="hover:text-[var(--wm-lime)] transition-colors">Privacy Policy</button>
            <button className="hover:text-[var(--wm-lime)] transition-colors">Terms of Service</button>
            <button className="hover:text-[var(--wm-lime)] transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
