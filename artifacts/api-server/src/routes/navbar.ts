import { Router } from "express";

const router = Router();

router.get("/navbar", (req, res) => {
  res.json({
    logo: "/logo.svg",
    logoText: "Namrata Universal",
    items: [
      { label: "Home", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "Technologies", href: "#technologies" },
      { label: "Team", href: "#team" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
    ctaLabel: "Get a Quote",
    ctaHref: "#contact",
  });
});

export default router;
