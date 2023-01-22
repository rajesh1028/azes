const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    name: String,
    avatar: String,
    price: Number,
    rating: Number
})

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel }