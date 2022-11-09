const express = require("express");
const { body } = require("express-validator");

const UserController = require("../controller/userController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();
router.get("/allUser", adminAuth, UserController.getAll);
module.exports = router;
