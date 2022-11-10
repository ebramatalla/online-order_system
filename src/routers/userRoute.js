const express = require("express");
const { body } = require("express-validator");
const auth = require("../middleware/userAuth");
const Controller = require("../controller/userController");
const IsRole = require("../middleware/isRole");

const { Roles } = require("../models/userSchema");

const router = express.Router();

//Edit User
router.patch("/user", auth, Controller.EditUser);
//get all Users
router.get("/user", auth, Controller.me);
//delete user
router.delete("/user", auth, Controller.deleteUser);
// make order
router.post("/makeOrder", auth, IsRole([Roles.Customer]), Controller.makeOrder);
module.exports = router;
