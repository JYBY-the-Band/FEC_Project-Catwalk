const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config.js');

router.get('/', (req, res) => {
  axios.get(`${config.url}/cart`, {
    headers: {
      'Authorization': config.token
    }
  })
    .then(data => {
      res.send(data.data).status(200);
    })
    .catch(err => res.send(err).status(500));
});

router.post('/', (req, res) => {
  axios.post(`${config.url}/cart`, {
    headers: {
      'Authorization': config.token
    }
  }, req.body)
    .then(data => {
      res.send(data.data).status(201);
    })
    .catch(err => res.send(err).status(500));
})

module.exports = router;