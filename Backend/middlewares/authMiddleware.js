import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    // Check if there’s a token in the header (e.g. "Authorization: Bearer <token>")
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the user ID to the request so controllers can use it
    req.user = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

