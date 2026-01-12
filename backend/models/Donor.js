const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  phone: String,
  city: String,

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  }
});

donorSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Donor", donorSchema);
