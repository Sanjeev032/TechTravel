// @ts-nocheck
import { Router } from "express";

const router = Router();

router.get("/testimonials", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Anupam Kumar",
      company: "Delhi NCR",
      role: "Businessman",
      content:
        "As a business owner, my goal was to find someone to create a website that was contemporary, easy to use and attractive. I wanted to add intuitive features that would allow my customers to easily find us and learn about our services. Mishra Travels delivered exactly that.",
      rating: 5,
      avatarUrl: "https://namratauniversal.com/img/review/Anupam Kumar.jpg",
    },
    {
      id: 2,
      name: "Prateek Jaiswal",
      company: "India",
      role: "Client",
      content:
        "They are amazing working for the website industry. Thanks a lot to provide us a world class website in short budget. I can say you are top.",
      rating: 5,
      avatarUrl: "https://namratauniversal.com/img/review/Prateek Jaiswal.jpg",
    },
    {
      id: 3,
      name: "Somya Gupta",
      company: "India",
      role: "Businesswoman",
      content:
        "We hired Mishra Travels for website development & designing and the rate was also in our budget. The ideas were new and fresh. Nice website design by Mishra Travels!",
      rating: 5,
      avatarUrl: "https://namratauniversal.com/img/review/Somya Gupta.jpg",
    },
    {
      id: 4,
      name: "Amit Tamang",
      company: "India",
      role: "Businessman",
      content:
        "This is the best company for website designing. I am very grateful towards Mishra Travels for their good work and support. Thank you so much!",
      rating: 5,
      avatarUrl: "https://namratauniversal.com/img/review/Amit Tamang.jpg",
    },
    {
      id: 5,
      name: "Premlata Patel",
      company: "India",
      role: "Client",
      content:
        "Mishra Travels is a good organisation with very helpful staff. I am very happy because they are available each and every time and always reply to messages and calls. Excellent service!",
      rating: 5,
      avatarUrl: "https://namratauniversal.com/img/review/Premlata Patel.jpg",
    },
    {
      id: 6,
      name: "Victor Armstrong",
      company: "Delhi NCR",
      role: "Businessman",
      content:
        "Really talented team they have. I am much satisfied with team Mishra Travels. This is the top website designing company in Delhi NCR. Highly recommended!",
      rating: 5,
      avatarUrl: "https://namratauniversal.com/img/review/Victor Armstrong.jpg",
    },
    {
      id: 7,
      name: "Mamta Rani",
      company: "Noida",
      role: "Businesswoman",
      content:
        "Nice experience with Mishra Travels. Really satisfied with the services. I can say this is the top website design company in Noida. Very professional team.",
      rating: 5,
      avatarUrl: "https://namratauniversal.com/img/review/Mamta Rani.jpg",
    },
    {
      id: 8,
      name: "Ekaa Architects",
      company: "India",
      role: "Business",
      content:
        "Good & professional company for website designing, ERP, CRM & Digital Marketing services. They understand our requirements well and delivered on time.",
      rating: 5,
      avatarUrl: "https://namratauniversal.com/img/review/Ekaa Architects.jpg",
    },
    {
      id: 9,
      name: "Kritee Dixit",
      company: "India",
      role: "Businesswoman",
      content:
        "What a team! Mishra Travels is a really good service provider — completely down to earth and professional. Completely satisfied with the service.",
      rating: 5,
      avatarUrl: "https://namratauniversal.com/img/review/Kritee Dixit.jpg",
    },
    {
      id: 10,
      name: "Suraj",
      company: "India",
      role: "Client",
      content:
        "Mishra Travels are the best website creators I have ever seen, and I would suggest more and more people to go for website designing with them. Superb work!",
      rating: 5,
      avatarUrl: "https://namratauniversal.com/img/review/suraj.jpg",
    },
  ]);
});

export default router;
