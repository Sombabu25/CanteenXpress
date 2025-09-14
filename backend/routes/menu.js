import express from "express";
import Menu from "../models/Menu.js";
import { protect, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Get all menu items (public)
router.get("/", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 Add menu item (Admin only)
router.post("/", protect, verifyAdmin, async (req, res) => {
  try {
    const newItem = new Menu(req.body);
    await newItem.save();
    res.status(201).json({ message: "Menu item added", menuItem: newItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 📌 Delete menu item (Admin only)
router.delete("/:id", protect, verifyAdmin, async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
