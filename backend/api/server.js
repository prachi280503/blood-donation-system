const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (cached)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URL);
  isConnected = true;
  console.log("MongoDB connected");
}

// connect DB before routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// routes
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/admin", require("../routes/adminRoutes"));
app.use("/api/donors", require("../routes/donorRoutes"));

// test route
app.get("/", (req, res) => {
  res.json({ message: "Blood Donation API running on Vercel" });
});

// ❌ DO NOT use app.listen on Vercel
module.exports = app;
