import { Router } from "express";

const router = Router();

router.get("/hero", (req, res) => {
  res.json({
    badge: { text: "Software Developer | AI Systems Builder" },
    title: "Hi, I am",
    titleHighlight: "Sanjeev Kumar",
    subtitle: "Building Next-Gen Web & AI Systems",
    description:
      "I build responsive, full-stack applications and integrate AI capabilities into everyday solutions. Focused on clean code and intuitive user experiences.",
    primaryCtaLabel: "View My Projects",
    primaryCtaHref: "#projects",
    secondaryCtaLabel: "Contact Me",
    secondaryCtaHref: "#contact",
    floatingTags: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "Python",
      "Ollama",
      "Tailwind",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Git"
    ],
  });
});

export default router;
