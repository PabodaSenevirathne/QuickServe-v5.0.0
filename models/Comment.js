// Comment model (comment.js)
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentId: { type: String, required: true, unique: true },
    product: { type: String, ref: 'Product', required: true },
    user: { type: String, ref: 'User', required: true },
    rating: { type: Number, required: true },
    image: String,
    text: String
});

module.exports = mongoose.model('Comment', commentSchema);
