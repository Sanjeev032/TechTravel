import { Router } from "express";

const router = Router();

router.get("/about", (req, res) => {
  res.json({
    sectionTag: "About Me",
    title: "Building Software,",
    titleHighlight: "One line of code at a time",
    description:
      "I am a Software Developer and AI Systems Builder based in Delhi, India. I specialize in the MERN stack and Next.js, and enjoy integrating modern AI tools (like Ollama and LangChain) into web applications to create smarter, more efficient products.",
    mission:
      "To craft intuitive, performant software that solves real-world problems and leverages the latest in AI and web technologies.",
    vision:
      "To continually learn, grow, and build systems that have a meaningful impact on users and businesses.",
    highlights: [
      "Full-Stack Web Development",
      "AI & LLM Integration",
      "Modern UI/UX Implementation",
      "RESTful API Design",
      "Database Management",
      "Open Source Contributor"
    ],
    yearsOfExperience: 2,
    clientsSatisfied: 10,
    projectsCompleted: 25,
  });
});

export default router;
