const express = require('express');
const router = express.Router();
const products = require('./products');
const questions = require('./questions');

router.use('/products', products);
router.use('/qa/questions', questions); // still need to finish put requests

module.exports = router;