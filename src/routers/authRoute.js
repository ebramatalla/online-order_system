const express = require("express");
const { body, validationResult } = require("express-validator");
const UserController = require("../controller/userController");
const auth = require("../middleware/userAuth");
const router = express.Router();

/*Sign Up **/
router.post(
  "/signup",
  body("name").isString().withMessage("Name Must Be String "),
  body("email").isEmail().withMessage("Email Must Be Valid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password Must Be 8 Letter"),
  UserController.newUser
);
/* log In **/
router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter valid Email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Please enter valid Password"),
  UserController.logIn
);
//*Lot out form dev*/
router.post("/logout", auth, UserController.logout);
//logOut From all Dev
router.post("/logoutAll", auth, UserController.logoutAll);
module.exports = router;
