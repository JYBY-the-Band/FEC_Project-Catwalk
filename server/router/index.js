const express = require('express');
const router = express.Router();
const products = require('./products.js');
const cart = require('./cart.js');

router.use('/products', products);
router.use('/cart', cart);

module.exports = router;