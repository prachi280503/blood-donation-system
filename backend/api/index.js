const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (use ENV variable)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/admin", require("../routes/adminRoutes"));
app.use("/api/donors", require("../routes/donorRoutes"));

// Root test route
app.get("/api", (req, res) => {
  res.json({ message: "Blood Donation API is working 🚀" });
});

// IMPORTANT: export app (NO app.listen)
module.exports = app;
