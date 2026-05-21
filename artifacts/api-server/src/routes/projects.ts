// @ts-nocheck
import { Router } from "express";

const router = Router();

router.get("/projects", (req, res) => {
  const { category } = req.query as { category?: string };

  const allProjects = [
    {
      id: 1,
      title: "Peace",
      category: "Web App",
      description:
        "Peace is a mood-responsive mental health web app that promotes calm and emotional balance through music therapy, guided breathing, journaling, and reflective quizzes.",
      imageUrl:
        "https://images.unsplash.com/photo-1518241353330-0f7941c2d1fd?w=800&q=80",
      tags: ["TypeScript", "Next.js", "AI", "Tailwind CSS"],
      liveUrl: "https://github.com/Sanjeev032/Peace",
      featured: true,
    },
    {
      id: 2,
      title: "LLM-Output-Verification",
      category: "Web App",
      description:
        "An application that helps you check credibility of output given by any LLM (like ChatGPT, Gemini, etc).",
      imageUrl:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
      tags: ["TypeScript", "React", "LLM", "Node.js"],
      liveUrl: "https://github.com/Sanjeev032/LLM-Output-Verification",
      featured: true,
    },
    {
      id: 3,
      title: "One-Cosmetics",
      category: "E-Commerce",
      description:
        "One is a modern, minimal cosmetic website built using HTML, CSS, JavaScript, Node.js, Express, and MongoDB. Features dynamic product listings and reviews.",
      imageUrl:
        "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=800&q=80",
      tags: ["JavaScript", "HTML/CSS", "Node.js", "MongoDB", "Express"],
      liveUrl: "https://github.com/Sanjeev032/One-Cosmetics",
      featured: true,
    },
    {
      id: 4,
      title: "Mindly",
      category: "Web App",
      description:
        "A free online mock interview website that is integrated with ollama for counter questioning and responses.",
      imageUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      tags: ["JavaScript", "React", "Ollama", "AI"],
      liveUrl: "https://mindly-nine.vercel.app",
      featured: true,
    },
    {
      id: 5,
      title: "Pahunn Luxury Clothing",
      category: "E-Commerce",
      description:
        "A luxury clothing brand website known as Pahunn, made using TypeScript, Next.js, and the MERN stack.",
      imageUrl:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
      tags: ["TypeScript", "Next.js", "MongoDB", "Node.js"],
      liveUrl: "https://github.com/Sanjeev032/Pahunn-Luxury-Clothing-Brand",
      featured: false,
    },
    {
      id: 6,
      title: "Gips Voice Assistant",
      category: "Desktop App",
      description:
        "A local AI agent which mainly works as a voice assistant on user command and controls the system locally.",
      imageUrl:
        "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80",
      tags: ["JavaScript", "Python", "AI", "Voice"],
      liveUrl: "https://github.com/Sanjeev032/Gips-Voice-Assistant-",
      featured: false,
    },
    {
      id: 7,
      title: "TechTravel",
      category: "Web App",
      description:
        "A travel application built with modern web technologies to explore the world in style.",
      imageUrl:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
      tags: ["TypeScript", "React", "Node.js"],
      liveUrl: "https://github.com/Sanjeev032/TechTravel",
      featured: false,
    },
    {
      id: 8,
      title: "Finance-UI",
      category: "Web App",
      description:
        "A clean and modern financial dashboard UI built with React for tracking analytics.",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tags: ["JavaScript", "React", "Tailwind CSS"],
      liveUrl: "https://finance-ui-lemon.vercel.app",
      featured: false,
    },
    {
      id: 9,
      title: "Symptor",
      category: "Web App",
      description:
        "A modern web application built using JavaScript and React to help users manage their health data.",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      tags: ["JavaScript", "React", "Node.js"],
      liveUrl: "https://symptor.vercel.app",
      featured: false,
    },
  ];

  const filtered =
    category && category !== "All"
      ? allProjects.filter((p) => p.category === category)
      : allProjects;

  res.json(filtered);
});

export default router;
