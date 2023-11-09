const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
 
});

const CategoryModel=mongoose.model("category",categorySchema)
module.exports={
    CategoryModel
}

// module.exports = mongoose.model("Category", categorySchema);
