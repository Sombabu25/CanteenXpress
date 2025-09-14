import express from "express";
import Order from "../models/Order.js";
import { protect, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Create new order
router.post("/", protect, async (req, res) => {
  try {
    const { table, items, paymentMethod } = req.body;

    if (!table || !items || items.length === 0) {
      return res.status(400).json({ message: "Table and items are required" });
    }

    // Calculate total price
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // ✅ Generate payment QR if Online
    let paymentQrCode = "";
    if (paymentMethod === "Online") {
      const upiId = "canteen@upi"; // 🔹 replace with your actual UPI ID later
      const upiUrl = `upi://pay?pa=${upiId}&pn=Canteen&am=${totalPrice}&cu=INR`;

      paymentQrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        upiUrl
      )}&size=200x200`;
    }

    const order = await Order.create({
      user: req.user._id,
      table,
      items: items.map((i) => ({
        menuItem: i.menuItem,
        quantity: i.quantity,
      })),
      totalPrice,
      paymentMethod,
      paymentQrCode,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Order Create Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Get my orders (for logged-in user)
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.menuItem", "name price")
      .populate("table", "number");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Admin: Get all orders
router.get("/", protect, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.menuItem", "name price")
      .populate("table", "number");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Admin: Update order status
router.put("/:id/status", protect, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status || order.status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
