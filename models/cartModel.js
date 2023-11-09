const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
  quantity: Number,
 
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  items: [cartItemSchema],
 
});

const CartModel=mongoose.model("cart",cartSchema)
module.exports={
    CartModel
}

