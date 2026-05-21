import { Router } from "express";

const router = Router();

router.get("/blogs", (req, res) => {
  res.json([
    {
      id: 1,
      title: "The Future of Enterprise AI: Beyond the Hype",
      excerpt:
        "AI is no longer a competitive advantage — it's table stakes. We explore how enterprise teams are actually deploying ML in production and what separates success stories from expensive failures.",
      category: "Artificial Intelligence",
      author: "Arun Patel",
      publishedAt: "2025-04-28",
      readTime: "8 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
      slug: "future-of-enterprise-ai",
    },
    {
      id: 2,
      title: "Microservices vs Monolith: Making the Right Call in 2025",
      excerpt:
        "After a decade of the microservices boom, the pendulum is swinging back. We break down the real trade-offs and help you decide what architecture actually fits your team's maturity and scale.",
      category: "Architecture",
      author: "Neha Joshi",
      publishedAt: "2025-04-12",
      readTime: "12 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      slug: "microservices-vs-monolith-2025",
    },
    {
      id: 3,
      title: "Building High-Performance React Apps at Scale",
      excerpt:
        "Code splitting, virtualization, and memoization are just the start. Learn the patterns our team uses to keep React apps snappy with 100,000+ concurrent users and complex real-time data.",
      category: "Frontend",
      author: "Karthik Reddy",
      publishedAt: "2025-03-30",
      readTime: "10 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      slug: "high-performance-react-scale",
    },
    {
      id: 4,
      title: "Kubernetes Cost Optimization: A Practical Guide",
      excerpt:
        "Running Kubernetes is expensive when done wrong. We share the actual steps we took to reduce cloud spend by 60% for a Series B startup without sacrificing reliability or performance.",
      category: "DevOps",
      author: "Vikram Singh",
      publishedAt: "2025-03-15",
      readTime: "9 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
      slug: "kubernetes-cost-optimization",
    },
    {
      id: 5,
      title: "Designing for Accessibility: More Than a Compliance Checkbox",
      excerpt:
        "WCAG compliance is the floor, not the ceiling. Discover how inclusive design thinking leads to better products for everyone — and why the most successful apps treat accessibility as a feature.",
      category: "Design",
      author: "Divya Nair",
      publishedAt: "2025-02-28",
      readTime: "7 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
      slug: "accessibility-design-guide",
    },
    {
      id: 6,
      title: "PostgreSQL Performance Tuning: The Definitive Checklist",
      excerpt:
        "Slow queries killing your user experience? Walk through our 25-point performance checklist that has consistently improved query times by 80-95% across dozens of production databases.",
      category: "Backend",
      author: "Rahul Gupta",
      publishedAt: "2025-02-10",
      readTime: "15 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
      slug: "postgresql-performance-tuning",
    },
  ]);
});

export default router;
