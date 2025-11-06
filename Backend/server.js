import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req,res)=>{
    res.send("Api is running...");
})

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/api/auth/google", async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    console.log("✅ Google verified user:", email);

    // Optionally: find or create user in your DB
    // const user = await User.findOrCreate({ email, name, picture });

    // Create your own JWT for your app
    const appToken = jwt.sign({ email, name }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token: appToken });
  } catch (err) {
    console.error("Google verification failed:", err);
    res.status(400).json({ message: "Invalid Google token" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
