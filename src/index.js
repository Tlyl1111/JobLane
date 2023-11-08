const express = require('express');
const morgan = require('morgan')
const handlebars = require('express-handlebars').engine;
var favicon = require('serve-favicon')
const path = require('path');

const app = express();
const port = 3101;

app.use(favicon(path.join(__dirname, 'public', 'img', 'logoJL.png')))

app.use(morgan('combined'))

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });