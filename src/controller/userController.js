const User = require("../models/userSchema");
const Order = require("../models/orderSchema");
const Meal = require("../models/foodSchema");
const { validationResult } = require("express-validator");
const confirmationCode = require("../Emails/account");
const { use } = require("../routers/mealRoute");
const { response } = require("express");
/**
 * Add New User
 */
const newUser = async (req, res, next) => {
  const user = new User({
    name: req.body["name"],
    email: req.body["email"],
    password: req.body["password"],
    confirmationCode: confirmationCode.randomNumber,
  });
  confirmationCode.Confirmation(req.body["email"]);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User Is Used Before Please Use Diff Email" });
    }

    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};
/**
 *
 * @param {email ,password} req
 * @param {*} res
 */
const logIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @return promise pf all user
 */
const getAll = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (e) {
    res.status(400).send();
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns edited user
 */
const EditUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @return the user logged in
 */
const me = async (req, res) => {
  res.status(200).send(req.user);
};
/**
 *
 * @param {id from req} req
 * @param {*} res
 * deleted user
 */
const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send({ message: "successfully", user: req.user });
  } catch (e) {
    res.status(500).send(e);
  }
};

/**
 *
 * @param {id from req} req
 * @param {*} res
 */
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
/* logout form all devices**/
const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
/**
 *
 * @param {id of user and Meal} req
 * @param {*} res
 */
const makeOrder = async (req, res) => {
  const order = new Order({
    ...req.body,
    Customer: req.user._id,
  });

  try {
    const meal = await Meal.findById(req.body.Meal);

    if (!meal) {
      return res.status(404).send({ error: "This meal Is Invalid" });
    }
    await order.save();
    res.send(await (await order.populate("Customer")).populate("Meal"));
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(404).send({ error: "This meal Is Invalid" });
    }
    res.status(404).send(error);
  }
};
const confEmail = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user.Verified) {
    return res.status(400).send({ message: "already Verified" });
  }
  if (user.confirmationCode == req.body["confEmail"]) {
    user.Verified = true;
    await user.save();
    return res.status(200).send({ Message: "Verified" });
  } else {
    return res.status(400).send({ Message: "Invalid Code" });
  }
};
const resendCode = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.Verified) {
      return res.status(400).send({ Message: "Already Verified " });
    }
    const ResendCode = confirmationCode.randomNumber;
    user.confirmationCode = ResendCode;
    await user.save();
    confirmationCode.Confirmation(req.user.email);
    res.status(200).send({ Message: "Sended" });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  newUser,
  EditUser,
  me,
  deleteUser,
  logIn,
  logout,
  logoutAll,
  getAll,
  makeOrder,
  confEmail,
  resendCode,
};
