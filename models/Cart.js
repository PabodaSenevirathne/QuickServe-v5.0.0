const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartId: { type: String, required: true, unique: true },
    products: [{ type: String, required: true }],
    quantities: [String],
    user: { type: String, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);
