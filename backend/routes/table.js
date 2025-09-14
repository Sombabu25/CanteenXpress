import express from "express";
import Table from "../models/Table.js";
import { protect, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Get all tables (public)
router.get("/", async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 Add table (Admin only)
router.post("/", protect, verifyAdmin, async (req, res) => {
  try {
    const table = new Table(req.body);
    await table.save();
    res.status(201).json(table);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
