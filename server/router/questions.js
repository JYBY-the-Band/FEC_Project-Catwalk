const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config.js');

router.get('/:product_id', (req, res) => {
  axios.get(`${config.url}/qa/questions/?product_id=${req.params.product_id}`, {
    headers: {
      'Authorization': config.token
    }
  })
    .then(data => {
      res.send(data.data).status(200);
    })
    .catch(err => res.send(err).status(500));
});

router.get('/:question_id/answers', (req, res) => {
  axios.get(`${config.url}/qa/questions/${req.params.question_id}/answers`, {
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
  axios.post(`${config.url}/qa/questions`, {
    body: req.params.body,
    name: req.params.name,
    email: req.params.email,
    product_id: req.params.product_id
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => res.send(err).status(500));
});

router.post(':question_id/answers', (req, res) => {
  axios.post(`${config.url}/qa/questions/${req.params.question_id}/answers`, {
    body: req.params.body,
    name: req.params.name,
    email: req.params.email,
    photos: req.params.photos
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => res.send(err).status(500));
});

// router.put(':question_id/helpful', (req, res) => {
//   axios.put(`${config.url}/qa/questions/${req.params.question_id}/helpful`, {
//     question_helpfulness: //4
//   })
//     .then(() => {
//       res.sendStatus(204);
//     })
//     .catch(err => res.send(err).status(500));
// });

module.exports = router;