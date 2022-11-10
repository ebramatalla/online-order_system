const mongoose = require("mongoose");
const StatusOfOrder = {
  notDelivered: "on my way",
  Delivered: "delivered",
};

const orderSchema = new mongoose.Schema({
  Meal: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Meal",
  },
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  status: {
    type: String,
    default: StatusOfOrder.notDelivered,
  },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
module.exports.Status = StatusOfOrder;
