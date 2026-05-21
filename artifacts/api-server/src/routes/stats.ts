// @ts-nocheck
import { Router } from "express";

const router = Router();

router.get("/stats", (req, res) => {
  res.json([
    { id: 1, value: 25, label: "GitHub Repositories", suffix: "+", prefix: "" },
    { id: 2, value: 2, label: "Years Experience", suffix: "+", prefix: "" },
    { id: 3, value: 10, label: "Projects Built", suffix: "+", prefix: "" },
    { id: 4, value: 100, label: "Percent Commited", suffix: "%", prefix: "" },
  ]);
});

export default router;
