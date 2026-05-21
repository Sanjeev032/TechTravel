import { Router } from "express";

const router = Router();

router.get("/services", (req, res) => {
  res.json([
    {
      id: 1,
      icon: "Globe",
      title: "Web Development",
      description:
        "High-performance web applications built with modern frameworks. From corporate sites to complex enterprise platforms, we deliver pixel-perfect, blazing-fast experiences.",
      features: [
        "React / Next.js / Vue.js frontends",
        "Node.js / Python / PHP backends",
        "RESTful & GraphQL APIs",
        "Progressive Web Apps (PWA)",
        "CMS Integration (WordPress, Strapi)",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      icon: "Smartphone",
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications that deliver seamless user experiences across iOS and Android, built for performance and scale.",
      features: [
        "Flutter & React Native",
        "iOS (Swift) & Android (Kotlin)",
        "Offline-first architecture",
        "Push notifications & analytics",
        "App Store / Play Store deployment",
      ],
      color: "from-violet-500 to-purple-600",
    },
    {
      id: 3,
      icon: "Cloud",
      title: "Cloud & DevOps",
      description:
        "End-to-end cloud infrastructure design, migration, and management. We optimize your stack for reliability, security, and cost-efficiency.",
      features: [
        "AWS, Azure & GCP architecture",
        "Docker & Kubernetes orchestration",
        "CI/CD pipeline setup",
        "Infrastructure as Code (Terraform)",
        "24/7 monitoring & alerting",
      ],
      color: "from-sky-400 to-blue-600",
    },
    {
      id: 4,
      icon: "Database",
      title: "ERP & CRM Solutions",
      description:
        "Custom ERP and CRM systems tailored to your business workflows. Streamline operations, eliminate inefficiencies, and gain real-time insights.",
      features: [
        "Custom ERP development",
        "Salesforce & HubSpot integration",
        "Inventory & supply chain modules",
        "HR & payroll management",
        "Business intelligence dashboards",
      ],
      color: "from-emerald-400 to-teal-600",
    },
    {
      id: 5,
      icon: "Brain",
      title: "AI & Machine Learning",
      description:
        "Intelligent solutions powered by cutting-edge AI. From predictive analytics to natural language processing, we make your data work harder.",
      features: [
        "Predictive analytics models",
        "Natural Language Processing (NLP)",
        "Computer vision systems",
        "Recommendation engines",
        "ChatBot & virtual assistant dev",
      ],
      color: "from-orange-400 to-rose-500",
    },
    {
      id: 6,
      icon: "ShieldCheck",
      title: "UI/UX Design",
      description:
        "Research-driven design that converts. We craft interfaces that are not just beautiful, but intuitive, accessible, and purpose-built for your audience.",
      features: [
        "User research & journey mapping",
        "Wireframing & prototyping",
        "Design systems & component libraries",
        "Accessibility (WCAG 2.1 AA)",
        "Motion design & micro-interactions",
      ],
      color: "from-pink-400 to-fuchsia-600",
    },
  ]);
});

export default router;
