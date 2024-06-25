const mongoose = require('mongoose');
let { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model("User", userSchema);
