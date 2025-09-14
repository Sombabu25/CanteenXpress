import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Middleware to verify logged-in user
export const protect = async (req, res, next) => {
  try {
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in .env");
      return res.status(500).json({ success: false, message: "Server misconfiguration" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    res.status(401).json({ success: false, message: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token" });
  }
};

// ✅ Middleware to check Admin
export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ success: false, message: "Access denied, admin only" });
};
