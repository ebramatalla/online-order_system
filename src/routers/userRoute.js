const express = require("express");
const { body } = require("express-validator");
const auth = require("../middleware/userAuth");
const UserController = require("../controller/userController");

const router = express.Router();

//Edit User
router.patch("/user/me", auth, UserController.EditUser);
//get all Users
router.get("/user/me", auth, UserController.me);
//delete user
router.delete("/user/remove", auth, UserController.deleteUser);
//make admin()
// router.patch("/admin/:id", UserController.makeAdmin);
module.exports = router;
