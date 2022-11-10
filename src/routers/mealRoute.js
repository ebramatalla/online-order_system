const express = require("express");
const router = express.Router();

const Controller = require("../controller/mealController");
const auth = require("../middleware/userAuth");
const IsRole = require("../middleware/isRole");
const { Roles } = require("../models/userSchema");
//add meal
router.post("/meal", auth, IsRole([Roles.ADMIN]), Controller.addMeal);
// edit Meal
router.patch("/meal/:id", auth, IsRole([Roles.ADMIN]), Controller.editMeal);
// get all meal
router.get("/meal", auth, IsRole([Roles.ADMIN]), Controller.getAllMeal);
// delete meal
router.delete("/meal/:id", auth, IsRole([Roles.ADMIN]), Controller.deleteMeal);

module.exports = router;
