const express = require("express");
require("../src/dataBase/mongoose");
const UserRouter = require("./routers/userRoute");
const MealRouter = require("./routers/mealRoute");
const authRouter = require("./routers/auth");
const adminRouter = require("./routers/adminRoute");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(UserRouter);
app.use(authRouter);
app.use(MealRouter);
app.use(adminRouter);
app.listen(port, () => {
  console.log("listening on port " + port);
});
