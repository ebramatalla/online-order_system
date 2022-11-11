const mongoose = require("mongoose");
const validator = require("validator");

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  // add image
});
const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;
