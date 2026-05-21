import { Router } from "express";

const router = Router();

router.get("/hero", (req, res) => {
  res.json({
    badge: { text: "Trusted by 500+ Businesses Worldwide" },
    title: "We Build Digital",
    titleHighlight: "Excellence",
    subtitle: "Software Solutions That Scale",
    description:
      "From enterprise web platforms to mobile apps and cloud solutions, Namrata Universal delivers precision-engineered software that transforms businesses and drives measurable growth.",
    primaryCtaLabel: "Start Your Project",
    primaryCtaHref: "#contact",
    secondaryCtaLabel: "View Our Work",
    secondaryCtaHref: "#projects",
    floatingTags: [
      "React",
      "Node.js",
      "Python",
      "AWS",
      "Flutter",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "GraphQL",
      "Next.js",
      "MongoDB",
    ],
  });
});

export default router;
