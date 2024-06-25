const mongoose = require('mongoose');
let { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    price: String,
    description: String,
    category: String,
    image: String,
    sale: Boolean

});

module.exports = mongoose.model("Product", productSchema);
