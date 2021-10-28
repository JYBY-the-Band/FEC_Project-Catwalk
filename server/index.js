const express = require('express')
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.listen(3000, () => {
  console.log('listening on port 3000');
})