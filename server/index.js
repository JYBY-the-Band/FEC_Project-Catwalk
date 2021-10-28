const express = require('express')
const path = require('path');
const morgan = require('morgan');

const app = express();
const router = require('./router/index.js');
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/api/', router);

app.listen(3000, () => {
  console.log('listening on port 3000');
})