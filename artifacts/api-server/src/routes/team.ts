import { Router } from "express";

const router = Router();

router.get("/team", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Preeti",
      role: "CEO & Founder",
      bio: "Visionary leader and founder of Namrata Universal. With deep expertise in IT solutions and a passion for digital transformation, Preeti built Namrata Universal into a trusted technology partner for businesses across India and beyond.",
      imageUrl:
        "https://namratauniversal.com/img/namrata-universal/Preeti(Co-Founder).jpg",
      linkedin: "https://www.linkedin.com/company/namrata-universal/",
      twitter: "https://twitter.com/NamrataUni",
    },
    {
      id: 2,
      name: "Brajesh Kumar Jaiswal",
      role: "Co-Founder",
      bio: "Co-Founder of Namrata Universal with a strong background in enterprise software and business strategy. Brajesh drives operational excellence and ensures every client relationship is built on trust, quality, and long-term success.",
      imageUrl:
        "https://namratauniversal.com/img/namrata-universal/Brajesh-Kumar-Jaiswal(CEO&FOUNDER).jpg",
      linkedin: "https://www.linkedin.com/company/namrata-universal/",
      twitter: "https://twitter.com/NamrataUni",
    },
    {
      id: 3,
      name: "Saurabh Mahawar",
      role: "Co-Founder",
      bio: "Co-Founder and technology strategist at Namrata Universal. Saurabh brings deep technical knowledge and creative thinking to every project, helping clients navigate complex IT challenges with innovative, cost-effective solutions.",
      imageUrl:
        "https://namratauniversal.com/img/namrata-universal/Saurabh-Mahawar(Co-Founder).jpg",
      linkedin: "https://www.linkedin.com/company/namrata-universal/",
      twitter: "https://twitter.com/NamrataUni",
    },
  ]);
});

export default router;
