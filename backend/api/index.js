const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB (USE ENV VARIABLE)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// ✅ Routes
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/admin", require("../routes/adminRoutes"));
app.use("/api/donors", require("../routes/donorRoutes"));

// ✅ Frontend (optional)
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.send("Blood Donation API is running 🚀");
});

// ❌ DO NOT USE app.listen()

module.exports = app;   // ✅ VERY IMPORTANT
