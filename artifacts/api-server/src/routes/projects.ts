import { Router } from "express";

const router = Router();

router.get("/projects", (req, res) => {
  const { category } = req.query as { category?: string };

  const allProjects = [
    {
      id: 1,
      title: "NexaRetail E-Commerce Suite",
      category: "E-Commerce",
      description:
        "A full-stack multi-vendor e-commerce platform built for a leading Indian retail chain — supporting 80,000+ daily orders, AI-powered recommendations, real-time inventory sync, and seamless payment gateway integrations.",
      imageUrl:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      tags: ["React", "Node.js", "PostgreSQL", "Redis", "AWS", "Stripe"],
      liveUrl: null,
      featured: true,
    },
    {
      id: 2,
      title: "SwasthyaConnect Telehealth Portal",
      category: "Web App",
      description:
        "HIPAA-inspired telemedicine platform connecting 500+ doctors with patients across India, featuring HD video consultations, e-prescriptions, and an integrated pharmacy ordering system.",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      tags: ["Next.js", "Python", "WebRTC", "Azure", "HIPAA"],
      liveUrl: null,
      featured: true,
    },
    {
      id: 3,
      title: "VistaCargo Logistics Platform",
      category: "Mobile App",
      description:
        "Cross-platform fleet management app providing real-time GPS tracking, route optimization using ML, and automated dispatch for a logistics company operating 3,000+ vehicles across 22 states.",
      imageUrl:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      tags: ["Flutter", "Node.js", "Firebase", "Google Maps", "ML Kit"],
      liveUrl: null,
      featured: true,
    },
    {
      id: 4,
      title: "FinEdge Banking Dashboard",
      category: "Web App",
      description:
        "Real-time financial analytics dashboard for a cooperative bank serving 200,000+ members — with loan management, transaction monitoring, fraud alerts, and RBI-compliant reporting modules.",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tags: ["React", "D3.js", "Spring Boot", "PostgreSQL", "Docker"],
      liveUrl: null,
      featured: false,
    },
    {
      id: 5,
      title: "GyanPath Learning Management System",
      category: "Web App",
      description:
        "Scalable EdTech platform serving 400,000+ students with live instructor sessions, adaptive quizzes, gamified progress tracking, and AI-curated learning paths.",
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      tags: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
      liveUrl: null,
      featured: false,
    },
    {
      id: 6,
      title: "KaryaSphere HR & ERP System",
      category: "ERP",
      description:
        "End-to-end HR and operations ERP for a mid-size manufacturing company — automating payroll, attendance biometrics, recruitment workflows, and compliance reporting for 4,000+ employees.",
      imageUrl:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
      tags: ["Angular", "Java Spring", "Oracle DB", "Azure AD", "Power BI"],
      liveUrl: null,
      featured: false,
    },
    {
      id: 7,
      title: "PropNest Real Estate Marketplace",
      category: "E-Commerce",
      description:
        "AI-powered property discovery platform with 3D virtual tours, smart valuation engine, buyer-agent chat, and integrated home loan processing for a leading Indian real estate group.",
      imageUrl:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      tags: ["React", "Python", "TensorFlow", "PostgreSQL", "GCP"],
      liveUrl: null,
      featured: false,
    },
    {
      id: 8,
      title: "ZestBite Food Delivery App",
      category: "Mobile App",
      description:
        "Hyperlocal food delivery platform with real-time order tracking, dynamic restaurant discovery, loyalty rewards, and an in-app analytics dashboard for 1,200+ restaurant partners.",
      imageUrl:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
      tags: ["React Native", "Node.js", "MongoDB", "Firebase", "Stripe"],
      liveUrl: null,
      featured: false,
    },
    {
      id: 9,
      title: "FabriCore Manufacturing ERP",
      category: "ERP",
      description:
        "Smart factory ERP integrating IoT sensor data from 8,000+ machines, predictive maintenance alerts, quality control modules, and production scheduling for a textile manufacturer.",
      imageUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      tags: ["Vue.js", "Python", "InfluxDB", "MQTT", "AWS IoT", "FastAPI"],
      liveUrl: null,
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
