
const siteRouter = require('./site');

const authRouter = require('./auth');

const adminRouter = require('./admin');

const employerRouter = require('./employer');

const jobseekerRouter = require('./jobseeker');

const job = require('./job')

function route(app) {
    app.use('/', authRouter);
    app.use('/admin', adminRouter);
    app.use('/employer', employerRouter);
    app.use('/jobseeker', jobseekerRouter);
    app.use('/', siteRouter);
    app.use('/', job);
}

module.exports = route;
