import { Router } from "express";

const router = Router();

router.get("/technologies", (req, res) => {
  res.json([
    { id: 1, name: "React", logoUrl: "https://cdn.worldvectorlogo.com/logos/react-2.svg", category: "Frontend" },
    { id: 2, name: "Next.js", logoUrl: "https://cdn.worldvectorlogo.com/logos/next-js.svg", category: "Frontend" },
    { id: 3, name: "Vue.js", logoUrl: "https://cdn.worldvectorlogo.com/logos/vue-js-1.svg", category: "Frontend" },
    { id: 4, name: "Angular", logoUrl: "https://cdn.worldvectorlogo.com/logos/angular-icon-1.svg", category: "Frontend" },
    { id: 5, name: "TypeScript", logoUrl: "https://cdn.worldvectorlogo.com/logos/typescript.svg", category: "Language" },
    { id: 6, name: "Node.js", logoUrl: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg", category: "Backend" },
    { id: 7, name: "Python", logoUrl: "https://cdn.worldvectorlogo.com/logos/python-5.svg", category: "Language" },
    { id: 8, name: "Laravel", logoUrl: "https://cdn.worldvectorlogo.com/logos/laravel-2.svg", category: "Backend" },
    { id: 9, name: "Django", logoUrl: "https://cdn.worldvectorlogo.com/logos/django.svg", category: "Backend" },
    { id: 10, name: "Flutter", logoUrl: "https://cdn.worldvectorlogo.com/logos/flutter.svg", category: "Mobile" },
    { id: 11, name: "React Native", logoUrl: "https://cdn.worldvectorlogo.com/logos/react-2.svg", category: "Mobile" },
    { id: 12, name: "AWS", logoUrl: "https://cdn.worldvectorlogo.com/logos/aws-2.svg", category: "Cloud" },
    { id: 13, name: "Docker", logoUrl: "https://cdn.worldvectorlogo.com/logos/docker.svg", category: "DevOps" },
    { id: 14, name: "Kubernetes", logoUrl: "https://cdn.worldvectorlogo.com/logos/kubernets.svg", category: "DevOps" },
    { id: 15, name: "PostgreSQL", logoUrl: "https://cdn.worldvectorlogo.com/logos/postgresql.svg", category: "Database" },
    { id: 16, name: "MongoDB", logoUrl: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg", category: "Database" },
    { id: 17, name: "Redis", logoUrl: "https://cdn.worldvectorlogo.com/logos/redis.svg", category: "Database" },
    { id: 18, name: "GraphQL", logoUrl: "https://cdn.worldvectorlogo.com/logos/graphql.svg", category: "API" },
    { id: 19, name: "Terraform", logoUrl: "https://cdn.worldvectorlogo.com/logos/terraform-enterprise.svg", category: "DevOps" },
    { id: 20, name: "GitHub", logoUrl: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg", category: "Tools" },
    { id: 21, name: "Figma", logoUrl: "https://cdn.worldvectorlogo.com/logos/figma-1.svg", category: "Design" },
    { id: 22, name: "Firebase", logoUrl: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg", category: "Cloud" },
    { id: 23, name: "Stripe", logoUrl: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg", category: "Payments" },
    { id: 24, name: "Elasticsearch", logoUrl: "https://cdn.worldvectorlogo.com/logos/elastic-stack.svg", category: "Search" },
  ]);
});

export default router;
