const express = require('express');
const morgan = require('morgan')
const handlebars = require('express-handlebars').engine;
const path = require('path');

const app = express();
const port = 3101;

app.use(morgan('combined'))

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });