import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Menu from "./models/Menu.js";
import Order from "./models/Order.js";
import Table from "./models/Table.js";
import bcrypt from "bcryptjs";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected for Seeding");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

// Sample Users
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Test Student",
    email: "student@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

// Sample Menu Items
const menuItems = [
  {
    name: "Veg Sandwich",
    description: "Fresh sandwich with vegetables",
    price: 120,
    image: "https://i.imgur.com/abcd123.jpg",
  },
  {
    name: "Cold Coffee",
    description: "Chilled iced coffee with cream",
    price: 80,
    image: "https://i.imgur.com/efgh456.jpg",
  },
  {
    name: "Margherita Pizza",
    description: "Classic cheese pizza",
    price: 250,
    image: "https://i.imgur.com/ijkl789.jpg",
  },
];

// Sample Tables (5 tables)
const tables = [
  { tableNumber: 1, qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=Table1&size=150x150" },
  { tableNumber: 2, qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=Table2&size=150x150" },
  { tableNumber: 3, qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=Table3&size=150x150" },
  { tableNumber: 4, qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=Table4&size=150x150" },
  { tableNumber: 5, qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=Table5&size=150x150" },
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Menu.deleteMany();
    await User.deleteMany();
    await Table.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleMenu = menuItems.map((item) => ({
      ...item,
      user: adminUser,
    }));

    await Menu.insertMany(sampleMenu);
    await Table.insertMany(tables);

    console.log("✅ Data Imported Successfully (Users + Menu + Tables)!");
    process.exit();
  } catch (err) {
    console.error("❌ Error with seeding:", err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Menu.deleteMany();
    await User.deleteMany();
    await Table.deleteMany();

    console.log("🔥 Data Destroyed Successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error with destroying data:", err);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

connectDB();
