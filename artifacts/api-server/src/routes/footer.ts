// @ts-nocheck
import { Router } from "express";

const router = Router();

router.get("/footer", (req, res) => {
  res.json({
    logo: "/logo.svg",
    logoText: "Mishra Travels",
    description:
      "Software Developer | AI Systems Builder based in Delhi, India. I build responsive, full-stack applications and integrate AI capabilities into everyday solutions.",
    columns: [
      {
        title: "Navigation",
        links: [
          { label: "Home", href: "#hero" },
          { label: "About Me", href: "#about" },
          { label: "Projects", href: "#projects" },
          { label: "Technologies", href: "#technologies" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "GitHub", href: "https://github.com/Sanjeev032" },
          { label: "LinkedIn", href: "https://linkedin.com" },
          { label: "Portfolio", href: "https://portfolio-opal-nine-59.vercel.app/" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Projects",
        links: [
          { label: "Peace", href: "#projects" },
          { label: "Mindly", href: "#projects" },
          { label: "One-Cosmetics", href: "#projects" },
          { label: "TechTravel", href: "#projects" },
        ],
      },
    ],
    socials: [
      { platform: "GitHub", href: "https://github.com/Sanjeev032", icon: "Github" },
      { platform: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
      { platform: "Twitter", href: "https://twitter.com", icon: "Twitter" },
    ],
    copyright: `© ${new Date().getFullYear()} Mishra Travels. All rights reserved.`,
    newsletterTitle: "Stay in the Loop",
    newsletterDescription:
      "Get updates on my latest open-source projects, articles, and AI experiments.",
  });
});

export default router;
