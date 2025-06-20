import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';

dotenv.config();
const app = express();

app.use(express.json()); // to parse JSON bodies

app.post('/products', async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: 'Name, price, and image are required' });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error saving product:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
});





connectDB(); // connect to DB first
app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
