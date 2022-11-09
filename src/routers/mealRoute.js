const express = require("express");
const Meal = require("../models/foodSchema");
const mealController = require("../controller/mealController");
const router = express.Router();
//add meal
router.post("/meal", mealController.addMeal);
// edit Meal
router.patch("/meal/:id", mealController.editMeal);
// get all meal
router.get("/meal", mealController.getAllMeal);
// delete meal
router.delete("/meal/:id", mealController.deleteMeal);

module.exports = router;
