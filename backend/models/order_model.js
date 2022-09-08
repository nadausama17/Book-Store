const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    productsInfo: [],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
