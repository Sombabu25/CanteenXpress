import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    tableNumber: { type: Number, required: true, unique: true },
    qrCode: { type: String, required: true }, // store QR code URL
  },
  { timestamps: true }
);

export default mongoose.model("Table", tableSchema);
