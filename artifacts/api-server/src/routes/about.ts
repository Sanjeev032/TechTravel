import { Router } from "express";

const router = Router();

router.get("/about", (req, res) => {
  res.json({
    sectionTag: "Who We Are",
    title: "Engineering the Future,",
    titleHighlight: "One Solution at a Time",
    description:
      "Namrata Universal is a full-service software development company founded with a singular mission: to help businesses harness the power of technology to achieve extraordinary outcomes. We combine deep technical expertise with creative thinking to deliver solutions that are not just functional — but transformational.",
    mission:
      "To deliver innovative, scalable, and reliable software solutions that empower businesses to achieve their full potential in the digital age.",
    vision:
      "To be the most trusted technology partner for businesses worldwide, known for our craftsmanship, integrity, and commitment to excellence.",
    highlights: [
      "ISO 9001:2015 Certified Quality Processes",
      "Agile & DevOps-driven delivery",
      "24/7 dedicated support",
      "End-to-end product development",
      "Post-launch maintenance & scaling",
      "Cross-industry domain expertise",
    ],
    yearsOfExperience: 12,
    clientsSatisfied: 500,
    projectsCompleted: 1200,
  });
});

export default router;
