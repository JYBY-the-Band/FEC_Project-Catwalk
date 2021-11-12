const express = require('express');
const axios = require('axios');
const config = require('../config.js');

const router = express.Router();

router.get('/:product_id', (req, res) => {
  axios.get(`${config.url}/qa/questions/?product_id=${req.params.product_id}`, {
    headers: {
      Authorization: config.token,
    },
  })
    .then((data) => {
      res.send(data.data).status(200);
    })
    .catch((err) => res.send(err).status(500));
});

router.get('/:question_id/answers', (req, res) => {
  axios.get(`${config.url}/qa/questions/${req.params.question_id}/answers`, {
    headers: {
      Authorization: config.token,
    },
  })
    .then((data) => {
      res.send(data.data).status(200);
    })
    .catch((err) => res.send(err).status(500));
});

router.post('/', (req, res) => {
  axios.post(`${config.url}/qa/questions`, req.body, {
    headers: {
      Authorization: config.token,
    },
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => res.send(err).status(500));
});

router.post('/:question_id/answers', (req, res) => {
  axios.post(`${config.url}/qa/questions/${req.params.question_id}/answers`, req.body, {
    headers: {
      Authorization: config.token,
    },
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => res.send(err).status(500));
});

router.put('/:question_id/helpful', (req, res) => {
  axios.put(`${config.url}/qa/questions/${req.params.question_id}/helpful`, req.body, {
    headers: {
      Authorization: config.token,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => res.send(err).status(500));
});

router.put('/:question_id/report', (req, res) => {
  axios.put(`${config.url}/qa/questions/${req.params.question_id}/report`, req.body, {
    headers: {
      Authorization: config.token,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => res.send(err).status(500));
});

router.put('/:answer_id/helpful', (req, res) => {
  axios.put(`${config.url}/qa/questions/${req.params.answer_id}/helpful`, req.body, {
    headers: {
      Authorization: config.token,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => res.send(err).status(500));
});

router.put('/:answer_id/report', (req, res) => {
  axios.put(`${config.url}/qa/questions/${req.params.answer_id}/report`, req.body, {
    headers: {
      Authorization: config.token,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => res.send(err).status(500));
});

module.exports = router;
