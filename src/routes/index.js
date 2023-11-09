const siteRouter = require('./site');

function route(app) {
    app.use('/', siteRouter);
    app.use('/home', siteRouter);
}

module.exports = route;
