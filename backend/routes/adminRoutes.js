const express = require("express");
const Donor = require("../models/Donor");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// GET ALL DONORS (PROTECTED)
router.get("/donors", auth, async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
});

// DASHBOARD STATS
router.get("/stats", async (req, res) => {
  const total = await Donor.countDocuments();
  const aPos = await Donor.countDocuments({ bloodGroup: "A+" });
  const bPos = await Donor.countDocuments({ bloodGroup: "B+" });

  res.json({ total, aPos, bPos });
});

// DELETE DONOR (PROTECTED)
router.delete("/donor/:id", auth, async (req, res) => {
  await Donor.findByIdAndDelete(req.params.id);
  res.json({ message: "Donor deleted" });
});

module.exports = router;
