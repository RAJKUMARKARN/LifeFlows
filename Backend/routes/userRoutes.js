import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Example of a protected route
router.get("/dashboard", protect, (req, res) => {
  res.json({ message: `Welcome user ${req.user}` });
});

export default router;