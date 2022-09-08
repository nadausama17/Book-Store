const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
