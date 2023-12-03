const express = require('express');
const morgan = require('morgan')
const handlebars = require('express-handlebars').engine;
var favicon = require('serve-favicon')
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3101;

const route = require('./routes');
const db = require('./config/db');

//Connect DB
db.connect();

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Đặt thành false cho môi trường không sử dụng HTTPS
    maxAge: 1000 * 60 * 60 * 24 // Thời hạn cookie, ví dụ 24 giờ
    // Các tùy chọn cookie khác nếu cần
  },
}));


app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  };
  next();
});

app.use(favicon(path.join(__dirname, 'public', 'img', 'logoJL.png')))
app.use('/src/public', express.static('src/public'));
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



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