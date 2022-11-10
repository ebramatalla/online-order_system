const Order = require("../models/orderSchema");
const { Status } = require("../models/orderSchema");

const editStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.body.id);
    if (!order) {
      res.status(404).send({ message: "Invalid Order" });
    }

    order.status = Status.Delivered;
    await order.save();
    res.status(200).send(order);
  } catch (error) {
    res.send(error);
  }
};
module.exports = {
  editStatus,
};
