// Comment API endpoints (commentRoutes.js)
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// GET all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET comments by product ID
router.get('/product/:productId', async (req, res) => {
    try {
        const comments = await Comment.find({ product: req.params.productId });
        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this product' });
        }
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific comment by ID
router.get('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findOne({ commentId: req.params.commentId });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new comment
router.post('/', async (req, res) => {
    const { product, user, rating, image, text } = req.body;
    try {
        // Generate a unique 4-digit comment ID
        const commentId = Math.floor(1000 + Math.random() * 9000);
        const newComment = new Comment({ commentId, product, user, rating, image, text });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a comment by ID
router.put('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findOne({ commentId: req.params.commentId });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        Object.assign(comment, req.body);
        const updatedComment = await comment.save();
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a comment by ID
router.delete('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({ commentId: req.params.commentId });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;