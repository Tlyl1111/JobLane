
const siteRouter = require('./site');

const authRouter = require('./auth');

function route(app) {
    app.use('/signin', authRouter);
    app.use('/', siteRouter);
}

module.exports = route;
