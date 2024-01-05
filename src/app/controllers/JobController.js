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
        const category = req.params.category;
        const currentDate = new Date();
        const jobs = await Job.find({ 
            EndDay: { $gt: currentDate },
        })
        .populate({
            path: 'JobDetailID',
            match: { 
                $or: [
                    { Category1ID: category },
                    { Category2ID: category },
                    { Category3ID: category }
                ]
            }
        })
        .populate('CompanyID');
        
        // Filter out the jobs that don't match the category
        const filteredJobs = jobs.filter(job => job.JobDetailID !== null);
        
        // Format the EndDay for each job
        const jobsObject = multipleMongooseToObject(filteredJobs).map(job => {
            let options = { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric'
            };
            job.EndDay = job.EndDay.toLocaleDateString('en-GB', options);
            return job;
        });
    
        res.render('search_result', { jobs: jobsObject });
    }
    
    
    
    
    
}

module.exports = new JobController();
