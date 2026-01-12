const express = require("express");
const Donor = require("../models/Donor");

const router = express.Router();


// ================================
// ADD DONOR (already working)
// ================================
router.post("/add", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.json({ message: "Donor Added Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================================
// SEARCH BY BLOOD + CITY
// ================================
router.get("/search", async (req, res) => {
  try {
    const { blood, city } = req.query;

    let query = {};

    if (blood) query.bloodGroup = blood;
    if (city) query.city = { $regex: city, $options: "i" };

    const donors = await Donor.find(query);
    res.json(donors);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================================
// NEARBY DONORS (LOCATION BASED)
// ================================
router.get("/nearby", async (req, res) => {
  try {
    const { lat, lng, km } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: "Latitude & Longitude required" });
    }

    const donors = await Donor.find(); // simple version (no geo index yet)

    res.json(donors);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/alert", (req, res) => {
  const { phone, blood } = req.body;

  console.log("SMS SENT TO:", phone, "for blood:", blood);

  res.json({ message: "Alert sent (demo)" });
});

module.exports = router;
