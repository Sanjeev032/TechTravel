import { Router } from "express";
import { SubmitContactBody } from "@workspace/api-zod";

const router = Router();

router.get("/contact", (req, res) => {
  res.json({
    sectionTag: "Let's Build Together",
    title: "Start Your Project",
    description:
      "Have an idea? A problem to solve? Or just want to explore what's possible? We'd love to hear from you. Our team typically responds within 4 business hours.",
    email: "hello@namratauniversal.com",
    phone: "+91 98765 43210",
    address: "5th Floor, Tech Park, Bandra Kurla Complex, Mumbai, Maharashtra 400051, India",
    mapEmbedUrl: null,
    infos: [
      {
        icon: "Mail",
        label: "Email Us",
        value: "hello@namratauniversal.com",
        href: "mailto:hello@namratauniversal.com",
      },
      {
        icon: "Phone",
        label: "Call Us",
        value: "+91 98765 43210",
        href: "tel:+919876543210",
      },
      {
        icon: "MapPin",
        label: "Visit Us",
        value: "BKC, Mumbai, India",
        href: null,
      },
      {
        icon: "Clock",
        label: "Working Hours",
        value: "Mon – Fri: 9:00 AM – 7:00 PM IST",
        href: null,
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
