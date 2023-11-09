const mongoose = require('mongoose');
const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
  quantity: Number,
});
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  items: [orderItemSchema],
  total: Number,
  status: String, 
});

const OrderModel=mongoose.model("order",orderSchema)
module.exports={
    OrderModel
}
