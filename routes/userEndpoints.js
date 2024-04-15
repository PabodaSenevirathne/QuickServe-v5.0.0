const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');


// Generate a random JWT secret key
const generateJWTSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

const JWT_SECRET = generateJWTSecret();
console.log(JWT_SECRET);

// Register endpoint
router.post('/register', [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { email, password, userName, firstName, lastName, shippingAddress } = req.body;
      // Generate a unique 4-digit user ID
      const userId = Math.floor(1000 + Math.random() * 9000);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({userId, email, password: hashedPassword, userName, firstName, lastName, shippingAddress });
      await user.save();
      res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  
  // Login endpoint
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login Sucessfull', token });
      // res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific user by userId
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new user
// router.post('/', async (req, res) => {
//     const { userId, email, password, userName, firstName, lastName, shippingAddress } = req.body;
//     try {
//         const newUser = new User({ userId, email, password, userName, firstName, lastName, shippingAddress });
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// UPDATE a user by userId
router.put('/:userId', async (req, res) => {
    const { email, password, userName, firstName, lastName, shippingAddress } = req.body;
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.email = email;
        if (req.body.password) {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          user.password = hashedPassword;
      }
        user.userName = userName;
        user.firstName = firstName;
        user.lastName = lastName;
        user.shippingAddress = shippingAddress;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a user by userId
router.delete('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ userId: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;