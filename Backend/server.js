import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import jwt from "jsonwebtoken";
import axios from "axios";
import { OAuth2Client } from "google-auth-library";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bloodRequestRoutes from "./routes/bloodRequestRoutes.js";
import scheduleDonationRoutes from "./routes/scheduleDonationRoutes.js";
import User from "./models/User.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// SERVE UPLOADED IMAGES
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bloodreq", bloodRequestRoutes);
app.use("/api/schedule_donation", scheduleDonationRoutes);

// GOOGLE LOGIN (FIXED)
app.post("/api/auth/google", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: "google-auth",
        profileImage: picture || "",
      });
    }

    const appToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token: appToken });
  } catch (err) {
    res.status(400).json({ message: "Google login failed" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
