const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config.js');

router.get('/', (req, res) => {
  axios.get(`${config.url}/products`, {
    headers: {
      'Authorization': config.token
    }
  })
    .then(data => {
      res.send(data.data).status(200);
    })
    .catch(err => res.send(err).status(500));
});

router.get('/:product_id', (req, res) => {
  axios.get(`${config.url}/products/${req.params.product_id}`, {
    headers: {
      'Authorization': config.token
    }
  })
    .then(data => {
      res.send(data.data).status(200);
    })
    .catch(err => res.send(err).status(500));
});

router.get('/:product_id/styles', (req, res) => {
  axios.get(`${config.url}/products/${req.params.product_id}/styles`, {
    headers: {
      'Authorization': config.token
    }
  })
    .then(data => {
      res.send(data.data).status(200);
    })
    .catch(err => res.send(err).status(500));
});

router.get('/:product_id/related', (req, res) => {
  axios.get(`${config.url}/products/${req.params.product_id}/related`, {
    headers: {
      'Authorization': config.token
    }
  })
    .then(data => {
      res.send(data.data).status(200);
    })
    .catch(err => res.send(err).status(500));
});

module.exports = router;