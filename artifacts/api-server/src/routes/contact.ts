import { Router } from "express";
import { SubmitContactBody } from "@workspace/api-zod";

const router = Router();

router.get("/contact", (req, res) => {
  res.json({
    sectionTag: "Let's Build Together",
    title: "Start Your Project",
    description:
      "Have an idea? A problem to solve? Or just want to explore what's possible? We'd love to hear from you. Our team typically responds within 4 business hours.",
    email: "sanjeev29039@gmail.com",
    phone: "+91-8860709959",
    address: "New Delhi, Delhi, India",
    mapEmbedUrl: null,
    infos: [
      {
        icon: "User",
        label: "Name",
        value: "Sanjeev Mishra",
        href: null,
      },
      {
        icon: "Mail",
        label: "Email Us",
        value: "sanjeev29039@gmail.com",
        href: "mailto:sanjeev29039@gmail.com",
      },
      {
        icon: "Phone",
        label: "Call Us",
        value: "+91-8860709959",
        href: "tel:+918860709959",
      },
      {
        icon: "MapPin",
        label: "Visit Us",
        value: "New Delhi, Delhi, India",
        href: null,
      },
      {
        icon: "Github",
        label: "GitHub",
        value: "github.com/Sanjeev-Mishra",
        href: "https://github.com/Sanjeev-Mishra",
      },
      {
        icon: "Linkedin",
        label: "LinkedIn",
        value: "linkedin.com/in/sanjeev-mishra",
        href: "https://linkedin.com/in/sanjeev-mishra",
      },
    ],
  });
});

router.post("/contact", (req, res) => {
  const result = SubmitContactBody.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "Invalid form data", details: result.error.flatten() });
    return;
  }

  req.log.info({ name: result.data.name, subject: result.data.subject }, "Contact form submitted");

  res.json({
    success: true,
    message: "Thank you for reaching out! Our team will get back to you within 4 business hours.",
  });
});

export default router;
