const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const Controller = require("../controller/mealController");
const auth = require("../middleware/userAuth");
const IsRole = require("../middleware/isRole");
const { Roles } = require("../models/userSchema");

const mealIdValidator = [
  param("id")
    .isMongoId()
    .custom(async (value, { req }) => {
      const meal = await Meal.findOne({
        _id: value,
        isAvailable: true,
      });
      if (!meal) {
        throw new Error("This meal not found");
      }
      // req.meal = meal;
    }),
];

//add meal
router.post(
  "/meal",
  auth,
  IsRole([Roles.ADMIN]),
  // validate The Input
  [
    body("name").isString().withMessage("Please enter Valid Name"),
    body("price").isNumeric().withMessage("please enter Valid Price"),
    body("description")
      .isString()
      .withMessage("please enter Valid description"),
  ],

  Controller.addMeal
);
// edit Meal
router.patch(
  "/meal/:id",
  auth,
  IsRole([Roles.ADMIN]),

  [
    body("name").optional().isString().withMessage("Please enter Valid Name"),
    body("price")
      .optional()
      .isNumeric()
      .withMessage("please enter Valid Price"),
    body("description")
      .optional()
      .isString()
      .withMessage("please enter Valid description"),
    body("isAvailable")
      .optional()
      .isBoolean()
      .withMessage("please enter Valid isAvailable or not"),
  ],
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
// router.delete(
//   "/meal/:id",
//   auth,
//   IsRole([Roles.ADMIN]),
//   [...mealIdValidator],
//   Controller.deleteMeal
// );

module.exports = router;
