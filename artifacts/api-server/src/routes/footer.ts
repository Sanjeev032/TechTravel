import { Router } from "express";

const router = Router();

router.get("/footer", (req, res) => {
  res.json({
    logo: "/logo.svg",
    logoText: "Namrata Universal",
    description:
      "Building the digital infrastructure of tomorrow. We partner with ambitious businesses to engineer software solutions that scale, endure, and deliver real impact.",
    columns: [
      {
        title: "Services",
        links: [
          { label: "Web Development", href: "#services" },
          { label: "Mobile Apps", href: "#services" },
          { label: "Cloud & DevOps", href: "#services" },
          { label: "ERP & CRM", href: "#services" },
          { label: "AI & ML Solutions", href: "#services" },
          { label: "UI/UX Design", href: "#services" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "#about" },
          { label: "Our Team", href: "#team" },
          { label: "Portfolio", href: "#projects" },
          { label: "Blog", href: "#blog" },
          { label: "Careers", href: "#contact" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Industries",
        links: [
          { label: "Healthcare & MedTech", href: "#projects" },
          { label: "Finance & Fintech", href: "#projects" },
          { label: "E-Commerce & Retail", href: "#projects" },
          { label: "Education & EdTech", href: "#projects" },
          { label: "Logistics & Supply Chain", href: "#projects" },
          { label: "Real Estate & PropTech", href: "#projects" },
        ],
      },
    ],
    socials: [
      { platform: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
      { platform: "Twitter", href: "https://twitter.com", icon: "Twitter" },
      { platform: "GitHub", href: "https://github.com", icon: "Github" },
      { platform: "Instagram", href: "https://instagram.com", icon: "Instagram" },
      { platform: "YouTube", href: "https://youtube.com", icon: "Youtube" },
    ],
    copyright: `© ${new Date().getFullYear()} Namrata Universal Pvt. Ltd. All rights reserved.`,
    newsletterTitle: "Stay in the Loop",
    newsletterDescription:
      "Engineering insights, tech trends, and company updates — delivered to your inbox monthly. No spam, ever.",
  });
});

export default router;
