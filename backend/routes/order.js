import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// 📌 Place a new order
// POST /api/orders
router.post("/", async (req, res) => {
  try {
    const { items, tableNumber, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    // ✅ Calculate total price
    const totalAmount = items.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 1);
    }, 0);

    // ✅ Create new order
    const order = await Order.create({
      items,
      tableNumber: tableNumber || null,
      paymentMethod: paymentMethod || "cash",
      totalAmount,
      status: "pending",
    });

    // ✅ Generate Payment QR (temporary placeholder)
    const qrCode =
      paymentMethod === "online"
        ? "https://api.qrserver.com/v1/create-qr-code/?data=PhonePePaymentLinkHere&size=200x200"
        : null;

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id,
      totalAmount,
      qrCode, // frontend will show this if payment is online
    });
  } catch (err) {
    console.error("Order Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Get all orders (admin only, later we can protect with verifyAdmin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Fetch Orders Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
