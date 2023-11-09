const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  availability: Boolean,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
});

const ProductModel=mongoose.model("product",productSchema)
module.exports={
    ProductModel
}

// module.exports = mongoose.model("Product", productSchema);
