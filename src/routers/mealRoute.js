const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const Controller = require("../controller/mealController");
const auth = require("../middleware/userAuth");
const IsRole = require("../middleware/isRole");
const { Roles } = require("../models/userSchema");
//add meal
router.post(
  "/meal",
  // validate The Input
  body("name").isString().withMessage("Please enter Valid Name"),
  body("price").isNumeric().withMessage("please enter Valid Price"),
  body("description").isString().withMessage("please enter Valid description"),
  auth,
  IsRole([Roles.ADMIN]),
  Controller.addMeal
);
// edit Meal
router.patch(
  "/meal/:id",
  auth,
  body("name").optional().isString().withMessage("Please enter Valid Name"),
  body("price").optional().isNumeric().withMessage("please enter Valid Price"),
  body("description")
    .optional()
    .isString()
    .withMessage("please enter Valid description"),
  IsRole([Roles.ADMIN]),
  Controller.editMeal
);
// get all meal
router.get(
  "/meal",
  auth,
  IsRole([Roles.ADMIN, Roles.Customer]),
  Controller.getAllMeal
);
// delete meal
router.delete("/meal/:id", auth, IsRole([Roles.ADMIN]), Controller.deleteMeal);

module.exports = router;
