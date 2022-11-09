const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decode = jwt.verify(token, "abram");
    const admin = await User.findOne({
      _id: decode._id,
      "tokens.token": token,
    });
    if (admin.Role == "user") {
      return res.send({ error: "Not Allowed" });
    }
    req.token = token;
    req.admin = admin;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please Auth" });
  }
};
module.exports = adminAuth;
