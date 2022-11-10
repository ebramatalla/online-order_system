const express = require("express");
const adminController = require("../controller/adminController");
const UserController = require("../controller/userController");
const auth = require("../middleware/userAuth");
const { Roles } = require("../models/userSchema");
const router = express.Router();
const IsRole = require("../middleware/isRole");
/**this route return all User  */
router.get("/allUser", auth, IsRole([Roles.ADMIN]), UserController.getAll);
/**
 * Chang status of order
 */
router.patch(
  "/editStatus",
  auth,
  IsRole([Roles.ADMIN]),
  adminController.editStatus
);
router.get("/allOrder", auth, IsRole([Roles.ADMIN]), adminController.allOrders);

module.exports = router;
