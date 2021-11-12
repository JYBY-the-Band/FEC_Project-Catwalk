const express = require('express');
const router = express.Router();

const products = require('./products.js');
const cart = require('./cart.js');
const products = require('./products');
const questions = require('./questions');


router.use('/products', products);
router.use('/cart', cart);
router.use('/qa/questions', questions); // still need to finish put requests

module.exports = router;