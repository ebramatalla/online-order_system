const express = require("express");
const { body } = require("express-validator");
const UserController = require("../controller/userController");
const auth = require("../middleware/userAuth");
const router = express.Router();

//sign Up
router.post(
  "/signup",
  body("name").isString().withMessage("Name Must Be String "),
  body("email").isEmail().withMessage("Email Must Be Valid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password Must Be 8 Letter"),
  UserController.newUser
);
//login
router.post("/login", UserController.logIn);
// logOut
router.post("/logout", auth, UserController.logout);
//logOut From all Dev
router.post("/logoutAll", auth, UserController.logoutAll);
module.exports = router;
