const Meal = require("../models/foodSchema");
const addMeal = async (req, res) => {
  const meal = new Meal({
    name: req.body["name"],
    description: req.body["description"],
    price: req.body["price"],
  });
  try {
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
const editMeal = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "price", "description"];
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
const getAllMeal = async (req, res) => {
  try {
    const allMeal = await Meal.find({});
    res.status(200).send(allMeal);
  } catch (e) {
    res.status(500).send(e);
  }
};
const deleteMeal = async (req, res) => {
  try {
    const deletedMeal = await Meal.findByIdAndDelete(req.params.id);
    if (!deletedMeal) {
      return res.status(404).send({ Error: "CanNot found This Meal" });
    }
    res.status(200).send({ message: "Deleted successfully", deletedMeal });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { addMeal, editMeal, getAllMeal, deleteMeal };
