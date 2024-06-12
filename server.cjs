const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// OAuth Route to initiate authentication
app.get('/auth', (req, res) => {
  const { SHOPIFY_API_KEY, SHOP_NAME } = process.env;
  const redirectUri = 'http://localhost:3000/callback';
  const scopes = 'read_orders';

  const authUrl = `https://${SHOP_NAME}.myshopify.com/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${scopes}&redirect_uri=${redirectUri}`;
  res.redirect(authUrl);
});

// Callback route to get access token
app.get('/callback', async (req, res) => {
  const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOP_NAME } = process.env;
  const { code } = req.query;

  try {
    const response = await axios.post(`https://${SHOP_NAME}.myshopify.com/admin/oauth/access_token`, {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    });

    const accessToken = response.data.access_token;

    // Save the access token in the database or in-memory storage
    // Here, just sending it as a response for simplicity
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).send('Error fetching access token');
  }
});

// Route to fetch orders
app.get('/api/orders', async (req, res) => {
  // Here you would fetch the access token from your database or in-memory storage
  const accessToken = 'your_dynamic_access_token';

  try {
    const response = await axios.get(`https://${process.env.SHOP_NAME}.myshopify.com/admin/api/2021-04/orders.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    });

    const orders = response.data.orders.map(order => ({
      id: order.id,
      customerName: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'Guest',
      totalPrice: order.total_price,
      createdAt: order.created_at,
    }));

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
