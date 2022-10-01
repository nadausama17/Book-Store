const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      minlength: 3,
    },
    numOfPages: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.pre('remove', async function(next){
  try{
    await this.model('User').updateMany({$pull:{'favoriteBooks':{bookId:this._id}}});
    await this.model('Cart').updateMany({$pull:{'books':{bookId:this._id}}});
  }catch(e){
    console.log(e);
  }
});

const bookModel = mongoose.model("Book", bookSchema);

module.exports = bookModel;
