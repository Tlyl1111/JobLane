const express = require('express');
const morgan = require('morgan')
const handlebars = require('express-handlebars').engine;
var favicon = require('serve-favicon')
const path = require('path');

const app = express();
const port = 3101;

const route = require('./routes');
const db = require('./config/db');

//Connect DB
db.connect();

app.use(favicon(path.join(__dirname, 'public', 'img', 'logoJL.png')))

app.use(morgan('combined'))

app.engine(
  'hbs',
  handlebars({
      extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });