const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var uniqueValidator = require("mongoose-unique-validator");

const userRoleValues = {
  ADMIN: "admin",
  Customer: "user",
};

require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: userRoleValues.Customer,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password mustn't contain password characters");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    confirmationCode: {
      type: Number,
    },
    Verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.virtual("order", {
  ref: "Order",
  localField: "_id",
  foreignField: "Customer",
});
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return { error: "User Not Found" };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { error: "Incorrect Password" };
  }
  return user;
};
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.confirmationCode;
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.SECRET_OF_Token
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const User = mongoose.model("User", userSchema);

userSchema.plugin(uniqueValidator);

module.exports = User;
module.exports.Roles = userRoleValues;
module.exports.userRoleValues = userRoleValues;
