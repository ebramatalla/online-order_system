const express = require("express");
const { body } = require("express-validator");
const UserController = require("../controller/userController");
const auth = require("../middleware/userAuth");
const role = require("../middleware/isRole");

const { Roles } = require("../models/userSchema");

const router = express.Router();
router.get("/allUser", auth, role([Roles.ADMIN]), UserController.getAll);
module.exports = router;
