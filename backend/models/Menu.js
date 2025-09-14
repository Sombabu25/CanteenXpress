import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String }, // optional image URL
    category: {
      type: String,
      enum: ["Beverages", "Snacks", "Meals", "Desserts", "Others"],
      default: "Others",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
