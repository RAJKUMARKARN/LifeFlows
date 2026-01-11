import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import User from "../models/User.js";
import { getProfile, updateProfile } from "../controllers/userController.js";

const router = express.Router();

// GET PROFILE
router.get("/profile", protect, getProfile);

// UPDATE PROFESSION + LOCATION
router.put("/profile", protect, updateProfile);

// UPLOAD PROFILE IMAGE
router.post(
  "/profile/image",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.profileImage = `/uploads/${req.file.filename}`;
      await user.save();

      res.json({ profileImage: user.profileImage });
    } catch (err) {
      res.status(500).json({ message: "Image upload failed" });
    }
  }
);

export default router;
