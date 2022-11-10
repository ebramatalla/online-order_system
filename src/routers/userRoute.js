const express = require("express");
const { body } = require("express-validator");
const auth = require("../middleware/userAuth");
const Controller = require("../controller/userController");
const IsRole = require("../middleware/isRole");

const { Roles } = require("../models/userSchema");

const router = express.Router();

//Edit User
router.patch(
  "/user",
  body("name").optional().isString().withMessage("Enter Valid Name"),
  body("email").optional().isEmail().withMessage("enter Valid Email"),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password Must Be 8 Letter"),
  auth,
  Controller.EditUser
);
//get all Users
router.get("/user", auth, Controller.me);
//delete user
router.delete("/user", auth, Controller.deleteUser);
// make order
router.post("/makeOrder", auth, IsRole([Roles.Customer]), Controller.makeOrder);
router.post("/confEmail", auth, IsRole([Roles.Customer]), Controller.confEmail);
router.post(
  "/resendCode",
  auth,
  IsRole([Roles.Customer]),
  Controller.resendCode
);
module.exports = router;
