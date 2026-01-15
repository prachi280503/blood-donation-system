const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URL);
  isConnected = true;
}

// connect DB per request (serverless safe)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "MongoDB connection failed" });
  }
});

// routes
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/admin", require("../routes/adminRoutes"));
app.use("/api/donors", require("../routes/donorRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "Blood Donation API running on Vercel" });
});

// ❌ NO app.listen()
module.exports = app;
