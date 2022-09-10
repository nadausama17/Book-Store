const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    books: [
      {
        bookId: {
          ref: "Book",
          type: mongoose.Schema.Types.ObjectId,
        },
        bookTitle:{
          type:String,
          required:true,
        },
        bookImage:{
          type:String,
          required:true,
        },
        bookPrice:{
          type:Number,
          required:true,
        },
        bookCount:{
          type:Number,
          default:0
        }
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    dateCreated:{
      type:String,
      required:true
    },
    delivered:{
      type:Boolean,
      default:false
    }
  }
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
