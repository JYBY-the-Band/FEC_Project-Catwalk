const express = require('express');
const products = require('./products.js');
const cart = require('./cart.js');
const questions = require('./questions');

const router = express.Router();

router.use('/products', products);
router.use('/cart', cart);
router.use('/qa/questions', questions);

module.exports = router;
