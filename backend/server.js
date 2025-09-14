import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/order.js";
import tableRoutes from "./routes/table.js"; // 
import adminRoutes from "./routes/admin.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//  Security Middleware
app.use(helmet());
app.use(morgan("dev"));

//  JSON parsing
app.use(express.json());

//  Enable CORS for frontend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // allow cookies/auth headers if needed
  })
);

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tables", tableRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(" MongoDB error:", err));

//  Start server
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
