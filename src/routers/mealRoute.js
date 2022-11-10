const express = require("express");
const router = express.Router();

const Controller = require("../controller/mealController");
const auth = require("../middleware/userAuth");
const role = require("../middleware/isRole");
const { Roles } = require("../models/userSchema");
//add meal
router.post("/meal", auth, role([Roles.ADMIN]), Controller.addMeal);
// edit Meal
router.patch("/meal/:id", auth, role([Roles.ADMIN]), Controller.editMeal);
// get all meal
router.get("/meal", auth, role([Roles.ADMIN]), Controller.getAllMeal);
// delete meal
router.delete("/meal/:id", auth, role([Roles.ADMIN]), Controller.deleteMeal);

module.exports = router;
