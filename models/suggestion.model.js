const mongoose = require('mongoose');
let { Schema } = mongoose;

const productSchema = new Schema({
    suggestion: String
});

module.exports = mongoose.model("Suggestion", productSchema);
