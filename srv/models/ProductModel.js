const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { 
        type: String,
        require: [true, "Product must have title"]
    },
    price: { 
        type: Number,
        require: [true, "Products must have price"]
    },
    description: { 
        type: String,
        require: [true, "Products must have description"]
    },
    category: { 
        type: String,
        require: [true, "Products must have category"]
    },
    image: String
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;