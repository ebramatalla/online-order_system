const User = require("../models/userSchema");
/**
 * Add New User
 */
const newUser = async (req, res, next) => {
  const user = new User({
    name: req.body["name"],
    email: req.body["email"],
    password: req.body["password"],
  });
  try {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User Is Used Before Please Use Diff Email" });
    }

    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};
// log in
const logIn = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};
// get all user
const getAll = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (e) {
    res.status(400).send();
  }
};
// edit User By Id
const EditUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};
// Get All user
const me = async (req, res) => {
  res.status(200).send(req.user);
};
//Delete User By id
const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send({ message: "successfully", user: req.user });
  } catch (e) {
    res.status(500).send(e);
  }
};
// mark as admin
// edit it letter
// const makeAdmin = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).send("User Not Found");
//     }
//     if (user.Role) {
//       return res.status(400).send("this is already Admin");
//     }
//     user.admin = true;
//     await user.save();
//     res.status(200).send(user);
//   } catch (e) {
//     return res.status(400).send(e);
//   }
// };
// logOut
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
// logout form all devices
const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  newUser,
  EditUser,
  me,
  deleteUser,
  logIn,
  logout,
  logoutAll,
  getAll,
};
