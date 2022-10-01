const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const USER_SCHEMA = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: "https://i.imgur.com/4s5qLzU.png",
  },
  password: {
    type: String,
    required: true,
  },
  address:{
    type:String,
  },
  role: {
    type: String,
    default: "user",
  },
  favoriteBooks: [
    {
      bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
      },
      bookTitle:{
        type: String,
        required: true,
      },
      bookImage:{
        type: String,
        required: true,
      },
      bookPrice:{
        type: Number,
        required: true,
      }
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Encrypting password before save
USER_SCHEMA.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

USER_SCHEMA.pre('remove',async function(next){
  try{
    await this.model('Cart').deleteOne({'userId':this._id});
  }catch(e){
    console.log(e);
  }
});

// Return JWT token
USER_SCHEMA.methods.getJwtToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};
USER_SCHEMA.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const USER = mongoose.model("User", USER_SCHEMA);

module.exports = USER;
