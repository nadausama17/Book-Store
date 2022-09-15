const cartModel = require("../models/cart_model");
const bookModel = require("../models/book_model");
const orderModel = require("../models/order_model");
const userModel = require("../models/user_model");

class Cart {
  static showCart = async (req, res) => {
    try {
      const userId = req.user._id;
      const cart = await cartModel
        .findOne({ userId: userId })
        .populate("books");
      if (!cart) {
        return res.status(404).send({ success: false, msg: "This user has no carts" });
      }
      res.status(200).send({
        success: true,
        books: cart.books,
        totalPrice: cart.totalPrice,
      });
    } catch (error) {
      res.status(500).send({ success: false, err: error.message });
    }
  };
  static addToCart = async (req, res) => {
    try {
      const { bookId, bookTitle, bookImage, bookPrice } = req.body;
      let cart = null;
      cart = await cartModel.findOne({ userId: req.user._id });
      if (!cart) {
        cart = new cartModel();
        cart.userId = req.user._id;
        cart.books.push({bookId,bookTitle,bookImage,bookPrice,bookCount:1});
        cart.totalPrice += bookPrice;
      } else {
        const cartBookIndex = cart.books.findIndex((book)=> book.bookId == bookId);
        if(cartBookIndex!=-1) cart.books[cartBookIndex].bookCount += 1;
        else  
          cart.books.push({bookId,bookTitle,bookImage,bookPrice,bookCount:1});
        cart.totalPrice += bookPrice;
      }
      await cart.save();

      res.status(200).json({
        success: true,
        msg: "Book added to cart!",
        data: cart,
      });
    } catch (error) {
      res.status(500).send({ success: false, err: error.message });
    }
  };
  static deleteBookFromCart = async (req, res) => {
    try {
      const userId = req.user._id;
      const bookId = req.params.bookId;
      const {bookPrice,bookCount} = req.query;
      const cart = await cartModel.findOne({ userId });
      cart.books = cart.books.filter((b) => b.bookId != bookId);
      cart.totalPrice -= (bookPrice*bookCount);
      await cart.save();
      res.status(200).json({
        success: true,
        msg: "Book removed from cart!",
        data: cart,
      });
    } catch (error) {
      res.status(500).send({ success: false, msg: error.message });
    }
  };
  static checkout = async (req, res) => {
    try {
      const userId = req.user._id;
      let books = [];
      const cart = await cartModel.findOne({ user: userId }).populate("books");
      for (let book of cart.books) {
        books.push({bookId:book.bookId,bookTitle:book.bookTitle,bookPrice:book.bookPrice,
        bookCount:book.bookCount,bookImage:book.bookImage});
      }
      const order = await orderModel.create({
        userId,
        books,
        totalPrice: req.body.totalPrice,
        dateCreated: req.body.dateCreated,
      });
      cart.books = [];
      cart.totalPrice = 0;
      await cart.save();
      return res.status(200).json({
        success: true,
        msg: "Thank you for your order! You can check it at the My Orders tab",
        data: order,
      });
    } catch (error) {
      res.status(500).send({ success: false, msg: error.message });
    }
  };

  static changeBookCount = async (req,res)=>{
    const bookId = req.params.bookId;
    const userId = req.user._id;
    try{
      const cart = await cartModel.findOne({userId}).populate('books');
      const bookIndex = cart.books.findIndex((b)=> b.bookId == bookId);
      //remove all the count of this book from price untill we get the new count
      let newTotalPrice = cart.totalPrice - (cart.books[bookIndex].bookPrice*cart.books[bookIndex].bookCount);
      cart.books[bookIndex].bookCount = req.body.bookCount;
      //add the price of the books after updating the count
      cart.totalPrice = newTotalPrice + (cart.books[bookIndex].bookCount*cart.books[bookIndex].bookPrice);
      await cart.save();
      res.status(200).send({success:true, msg:'Book count updated', books:cart.books , totalPrice:cart.totalPrice});
    }catch(err){
      res.status(500).send({success:false, msg:err.message});
    }
  }
}

module.exports = Cart;
