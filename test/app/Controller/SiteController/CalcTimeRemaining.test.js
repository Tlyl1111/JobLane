const SiteController =require('../../../../src/app/controllers/SiteController');
const Job = require('../../../../src/app/models/Job');

jest.mock('../../../../src/app/models/Job');

describe('calculateTimeRemaining', () => {
      it('should return 0 if the end date is in the past', async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const result = await SiteController.calculateTimeRemaining(pastDate);
        expect(result).toBe(0);
      });
  
      it('should return the correct number of days if the end date is in the future', async () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);
        const result = await SiteController.calculateTimeRemaining(futureDate);
        expect(result).toBe(5);
      });
      it('should return 1 if the end date is tomorrow', async () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const result = await SiteController.calculateTimeRemaining(tomorrow);
        expect(result).toBe(1);
      });
  
      it('should return 7 if the end date is a week from now', async () => {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        const result = await SiteController.calculateTimeRemaining(nextWeek);
        expect(result).toBe(7);
      });
  
      it('should return 30 if the end date is a month from now', async () => {
        const nextMonth = new Date();
        nextMonth.setDate(nextMonth.getDate() + 30);
        const result = await SiteController.calculateTimeRemaining(nextMonth);
        expect(result).toBe(30);
      });
      it('calculateTimeRemaining should not return incorrect results', async () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);
        const result = await SiteController.calculateTimeRemaining(futureDate);
        expect(result).not.toBe(4);
        expect(result).not.toBe(6);
      });
      it('calculateTimeRemaining should not return a negative value', async () => {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 1);
  const result = await SiteController.calculateTimeRemaining(pastDate);
  expect(result).not.toBeLessThan(0);
});


});


describe('calculateJobs', () => {
    it('should return jobs with time remaining', async () => {
      // Mock job data
      // Mock job data
        const jobs = [
            { EndDay: new Date(Date.now() + 86400000), toObject: function() { return this; } }, // job ends in 1 day
            { EndDay: new Date(Date.now() + 172800000), toObject: function() { return this; } }, // job ends in 2 days
        ];
  
      // Mock Job.find
      Job.find.mockResolvedValue(jobs);
  
      // Mock calculateTimeRemaining
      SiteController.calculateTimeRemaining = jest.fn();
      SiteController.calculateTimeRemaining.mockResolvedValueOnce(1);
      SiteController.calculateTimeRemaining.mockResolvedValueOnce(2);
  
      // Call calculateJobs
      const req = {};
      const res = { json: jest.fn() };
      await SiteController.calculateJobs(req, res);
  
      // Assert that res.json was called with the correct data
      expect(res.json).toHaveBeenCalledWith([
        { ...jobs[0], daysRemaining: 1 },
        { ...jobs[1], daysRemaining: 2 },
      ]);
    });
    it('should log an error if there is an error fetching the jobs', async () => {
        // Mock Job.find to reject with an error
        Job.find.mockRejectedValue(new Error('Database error'));
      
        // Spy on console.error
        console.error = jest.fn();
      
        // Call calculateJobs
        const req = {};
        const res = { json: jest.fn() };
        await SiteController.calculateJobs(req, res);
      
        // Assert that console.error was called with the error message
        expect(console.error).toHaveBeenCalledWith('Database error');
    });
    it('should log an error if there is an error calculating the time remaining for a job', async () => {
        // Mock job data
        const jobs = [
          { EndDay: new Date(Date.now() + 86400000), toObject: function() { return this; } }, // job ends in 1 day
        ];
      
        // Mock Job.find to return the jobs
        Job.find.mockResolvedValue(jobs);
      
        // Mock calculateTimeRemaining to reject with an error
        SiteController.calculateTimeRemaining = jest.fn();
        SiteController.calculateTimeRemaining.mockRejectedValue(new Error('Calculation error'));
      
        // Spy on console.error
        console.error = jest.fn();
      
        // Call calculateJobs
        const req = {};
        const res = { json: jest.fn() };
        await SiteController.calculateJobs(req, res);
      
        // Assert that console.error was called with the error message
        expect(console.error).toHaveBeenCalledWith('Calculation error');
    });
      
  });