const express = require('express');
const bodyParser = require('body-parser');
const items = require('./routes/items');

const app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());
app.use('/api', items);

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});