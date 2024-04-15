const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    shippingCost: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
