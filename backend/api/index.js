const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route (IMPORTANT)
app.get("/", (req, res) => {
  res.send("API is working on Vercel 🚀");
});

// example API
app.get("/api/test", (req, res) => {
  res.json({ message: "Test API working" });
});

// ❌ DO NOT USE app.listen()
// export app instead
module.exports = app;
