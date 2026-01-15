const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(express.json());

// -------------------- MONGODB CONNECTION --------------------
mongoose
  .connect(
    "mongodb+srv://prachi:prachi123@clustemonr0.vapkmrc.mongodb.net/bloodDB?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// -------------------- ROUTES --------------------
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/donors", require("./routes/donorRoutes"));

// -------------------- FRONTEND (optional) --------------------
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.send("Blood Donation System API is running 🚑");
});

// -------------------- SERVER --------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
