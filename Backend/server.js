import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; // optional if you want separate routes
import jwt from "jsonwebtoken";
import axios from "axios";
import { OAuth2Client } from "google-auth-library";
import bloodRequestRoutes from "./routes/bloodRequestRoutes.js";
import scheduleDonationRoutes from "./routes/scheduleDonationRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/bloodreq", bloodRequestRoutes);
app.use("/api/schedule_donation", scheduleDonationRoutes);
// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔹 Google Login Route
app.post("/api/auth/google", async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Optionally: find or create user in your DB

    // Create app JWT
    const appToken = jwt.sign({ email, name }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token: appToken });
  } catch (err) {
    console.error("Google verification failed:", err);
    res.status(400).json({ message: "Invalid Google token" });
  }
});

// 🔹 Facebook Login Route
app.post("/api/auth/facebook", async (req, res) => {
  const { accessToken, userID } = req.body;

  try {
    // Verify token with Facebook Graph API
    const fbRes = await axios.get(
      `https://graph.facebook.com/v17.0/${userID}?fields=id,name,email&access_token=${accessToken}`

    );

    const { id, name, email } = fbRes.data;

    // Create JWT
    const appToken = jwt.sign({ id, name, email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token: appToken });
  } catch (error) {
    console.error("Facebook login failed:", error.response?.data || error.message);
    res.status(400).json({ message: "Facebook login failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
