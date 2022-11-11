const Meal = require("../models/mealSchema");
const { validationResult } = require("express-validator");
const { userRoleValues } = require("../models/userSchema");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns Added Meal
 */
const addMeal = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const meal = new Meal({
      name: req.body["name"],
      description: req.body["description"],
      price: req.body["price"],
    });

    const existMeal = await Meal.findOne({ name: meal.name });
    if (existMeal) {
      return res.status(400).send({ message: "Meal Is Added Before" });
    }

    await meal.save();
    res.send(meal);
  } catch (e) {
    res.status(400).send(e);
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns edit Meal
 */
const editMeal = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "price", "description", "isAvailable"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const meal = await Meal.findById(req.params.id);

    updates.forEach((update) => {
      meal[update] = req.body[update];
    });
    await meal.save();
    if (!meal) {
      return res.status(404).send({ error: "Can Not Find This Meal" });
    }
    res.send(meal);
  } catch (e) {
    res.send(e);
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns all meals
 */
const getAllMeal = async (req, res) => {
  try {
    const { role } = req.user;
    let query = {};
    let selectionText = "";
    switch (role) {
      case userRoleValues.ADMIN:
        query = {};
        selectionText = "";
        break;
      case userRoleValues.Customer:
        query = {
          isAvailable: true,
        };
        selectionText = "";
        break;
    }

    const totalMeals = await Meal.find(query).countDocuments();

    const allMeal = await Meal.find(query).select(selectionText).limit(10);

    res.status(200).send({ allMeal, totalMeals });
  } catch (e) {
    res.status(500).send(e);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns if deleted or not
 *
 */
// const deleteMeal = async (req, res) => {
//   try {
//     const deletedMeal = await Meal.findByIdAndDelete(req.params.id);
//     if (!deletedMeal) {
//       return res.status(404).send({ Error: "CanNot found This Meal" });
//     }
//     res.status(200).send({ message: "Deleted successfully", deletedMeal });
//   } catch (e) {
//     res.status(500).send(e);
//   }
// };

module.exports = { addMeal, editMeal, getAllMeal };
