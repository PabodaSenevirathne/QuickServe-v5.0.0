const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware
app.use(cors());

app.use(bodyParser.json());

const uri = "mongodb+srv://paboda95official:MongoDb1995@cluster0.wjjt4qr.mongodb.net/concepta?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB connection
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error('MongoDB connection error:', error));

// Routes
const productEndpoints = require('./routes/productEndpoints');
const userEndpoints = require('./routes/userEndpoints');
const commentEndpoints = require('./routes/commentEndpoints');
const cartEndpoints = require('./routes/cartEndpoints');
const orderEndpoints = require('./routes/orderEndpoints');

app.use('/api/products', productEndpoints);
app.use('/api/users', userEndpoints);
app.use('/api/comments', commentEndpoints);
app.use('/api/carts', cartEndpoints);
app.use('/api/orders', orderEndpoints);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

