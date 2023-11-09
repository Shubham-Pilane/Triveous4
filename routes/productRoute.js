const express = require('express');
const productRoute = express.Router();
const {ProductModel} = require('../models/productModel');
const {CartModel} = require('../models/cartModel');
const {OrderModel}=require("../models/orderModel")
const {authenticateUser} = require('../middleware/authentication');

// 1.  Route to get all products
productRoute.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get Products ' });
  }
});

// 2. Get product detail by ID
productRoute.get('/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ "error": error.message });
  }
});

// 3 .  Route to add a product to the user's cart
productRoute.post('/addToCart', authenticateUser, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  // Check if the product exists
  const product = await ProductModel.findById(productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  try {
    let cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      cart = new CartModel({ user: userId, items: [] });
    }

    // Add the product to the cart
    const cartItem = { product: productId, quantity };
    cart.items.push(cartItem);
    await cart.save();

    res.json({ message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Falied to add product in cart ' });
  }
});

// 4 . Route to view the user's cart
productRoute.get('/cart', authenticateUser, async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ "error": error.message});
  }
});

// 5 . Route to update the quantity of a product in the  cart
productRoute.put('/updateCart/:productId', authenticateUser, async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId;
  const {quantity} = req.body;

  try {
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartItem = cart.items.find((item) => item.product.toString() === productId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    cartItem.quantity = quantity;
    await cart.save();

    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Falied to update the cart !' });
  }
});

// 6. Route to remove a product from the  cart
productRoute.delete('/remove/:productId', authenticateUser, async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId;

  try {
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartItemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (cartItemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    cart.items.splice(cartItemIndex, 1);
    await cart.save();

    res.json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Falied to remove the product' });
  }
}); 

// 7 . Route for Placing the order

productRoute.post('/placeOrder', authenticateUser, async (req, res) => {
    const userId = req.user._id;
  
    try {
      // get the users cart
      const cart = await CartModel.findOne({ user: userId });
  
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }
  
      // Calculate the total price of the order
      let total = 0;
      for (const cartItem of cart.items) {
        const product = await ProductModel.findById(cartItem.product);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        total += product.price * cartItem.quantity;
      }
  
      // Create a new order document

      const order = new OrderModel({
        user: userId,
        items: cart.items,
        total,
        status: 'Pending', 
      });
  
      // Save the order to the database
      await order.save();

      cart.items = [];
      await cart.save();
  
      res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to place the order' });
    }
  });

  // 8.Route to get the orderHistroy

  productRoute.get('/orderHistory', authenticateUser, async (req, res) => {
    const userId = req.user._id;
  
    try {
      const orders = await OrderModel.find({ user: userId });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve order history' });
    }
  });

  // 9.Route to get the order detalis by ID

  productRoute.get('/orderDetails/:orderId', authenticateUser, async (req, res) => {
    const userId = req.user._id;
    const orderId = req.params.orderId;
  
    try {
      const order = await OrderModel.findOne({ _id: orderId, user: userId });
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve order details' });
    }
  });
  

module.exports = {productRoute};
