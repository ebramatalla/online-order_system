const mongoose = require("mongoose");
const StatusOfOrder = {
  pending: "pending",
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
    default: StatusOfOrder.pending,
  },
  orderNumber: {
    type: Number,
    required: true,
  },

  // add number of order
  // add Order Num (track)
  // available or not
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
module.exports.Status = StatusOfOrder;
