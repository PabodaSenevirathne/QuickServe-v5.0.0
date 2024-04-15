// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET all carts
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific cart by cartId
router.get('/:cartId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ cartId: req.params.cartId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET cart by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user' });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new cart
router.post('/', async (req, res) => {
    const { products, quantities, user } = req.body;
    try {
        // Generate a unique 4-digit cart ID
        const cartId = Math.floor(1000 + Math.random() * 9000);
        const newCart = new Cart({ cartId, products, quantities, user });
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// PUT (update quantities) for products in a cart by cartId and productId
router.put('/:cartId/products/:productId', async (req, res) => {
    const { quantity } = req.body;
    try {
        const cart = await Cart.findOne({ cartId: req.params.cartId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        // Find the index of the product in the cart
        const productIndex = cart.products.findIndex(product => product === req.params.productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        // Update the quantity of the product
        cart.quantities[productIndex] = quantity;
        // Save the updated cart
        const updatedCart = await cart.save();
        res.json(updatedCart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// // PUT (update) a cart by cartId
// router.put('/carts/:cartId', async (req, res) => {
//     const { products, quantities, user } = req.body;
//     try {
//         const updatedCart = await Cart.findOneAndUpdate(
//             { cartId: req.params.cartId },
//             { products, quantities, user },
//             { new: true }
//         );
//         if (!updatedCart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }
//         res.json(updatedCart);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// DELETE a cart by cartId
router.delete('/:cartId', async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ cartId: req.params.cartId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json({ message: 'Cart deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;