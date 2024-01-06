const Account = require('../models/Account');
const Application = require('../models/Application');
const Comment = require('../models/Comment');
const Company = require('../models/Company');
const Job = require('../models/Job');
const JobDetail = require('../models/JobDetail');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { multipleMongooseToObject, mongooseToObject } = require('../../utils/mongoose');  // adjust the path as needed

class JobController {

    async categories(req, res) {
        res.render('categories');
    }

    async alljob(req, res) {
        const currentDate = new Date();
        const jobs = await Job.find({
            EndDay: { $gt: currentDate },
            //Status: 'approved'
        }).populate('JobDetailID').populate('CompanyID');

        // Format the EndDay for each job
        const jobsObject = multipleMongooseToObject(jobs).map(job => {
            let options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            };
            job.EndDay = job.EndDay.toLocaleDateString('en-GB', options);
            return job;
        });

        res.render('search_result', { jobs: jobsObject });
    };
    // async jobDetails(req, res) {
    //     console.log('jobDetails method called'); // This will log when the jobDetails method is called
    //     const id = req.params.id;
    //     console.log('Job ID:', id); // This will log the job ID
    //     try {
    //         const job = await Job.findById(id).populate('JobDetailID').populate('CompanyID');
    //         console.log('Job data:', job); // This will log the job data
    //         const jobObject = mongooseToObject(job);
    //         res.render('job_posting_detail', { job: jobObject });
    //     } catch (error) {
    //         console.log('Error fetching job data:', error); // This will log any errors when fetching the job data
    //     }
    // }
    async jobDetails(req, res) {
        console.log('jobDetails method called'); // This will log when the jobDetails method is called
        const id = req.params.id;
        console.log('Job ID:', id); // This will log the job ID
        try {
            const job = await Job.findById(id).populate('JobDetailID').populate('CompanyID');
            console.log('Job data:', job); // This will log the job data
            const jobObject = mongooseToObject(job);
            res.render('job_posting_detail', { job: jobObject });
        } catch (error) {
            console.log('Error fetching job data:', error); // This will log any errors when fetching the job data
        }
    }
    async jobsByCategory(req, res) {
        console.log('jobsByCategory method called');
        const category = req.params.category;
        console.log('Category:', category);
        try {
            // Find the JobDetail documents that match the category
            const jobDetails = await JobDetail.find({ Category: category });

            // Extract the _id of each JobDetail document
            const jobDetailIds = jobDetails.map(jobDetail => jobDetail._id);

            // Find the Job documents that reference the JobDetail documents
            const jobs = await Job.find({ JobDetailID: { $in: jobDetailIds } })
                .populate('JobDetailID')
                .populate('CompanyID');
            console.log('Jobs data:', jobs);

            const jobsObject = jobs.map(job => mongooseToObject(job));
            if (jobs.length === 0) {
                res.render('search_no_results');
            } else {
                const jobsObject = jobs.map(job => mongooseToObject(job));
                res.render('search_result', { jobs: jobsObject });
            }
        } catch (error) {
            console.log('Error fetching job data:', error);
        }
    }

}

module.exports = new JobController();
