import { Router } from "express";

const router = Router();

router.get("/stats", (req, res) => {
  res.json([
    { id: 1, value: 12, label: "Years of Excellence", suffix: "+", prefix: "" },
    { id: 2, value: 500, label: "Clients Worldwide", suffix: "+", prefix: "" },
    { id: 3, value: 1200, label: "Projects Delivered", suffix: "+", prefix: "" },
    { id: 4, value: 99, label: "Client Retention Rate", suffix: "%", prefix: "" },
  ]);
});

export default router;
