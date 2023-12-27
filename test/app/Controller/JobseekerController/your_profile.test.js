// your_profile.test.js
const JobseekerController =require('../../../../src/app/controllers/JobseekerController');
const User = require('../../../../src/app/models/User');

jest.mock('../../../../src/app/models/User', () => ({
    findByIdAndUpdate: jest.fn().mockImplementation((id, update, options) => {
        return { exec: jest.fn().mockResolvedValueOnce() };
    }),
}));
describe('your_profile_name_combine', () => {
    let req, res;

    beforeEach(() => {
        req = {
            session: {},
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            redirect: jest.fn()
        };
    });

    it('should combine the first name and last name', async () => {
        req.session.userId = '123';
        req.body = {
            firstName: 'John',
            lastName: 'Doe',
            // ... rest of the body properties ...
        };

        User.findByIdAndUpdate.mockResolvedValueOnce();

        await JobseekerController.your_profile(req, res);

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith('123', { $set: { Name: 'JohnDoe' } }, { new: true, useFindAndModify: false });
    });
    it('should not combine the first name and last name in the wrong order', async () => {
        req.session.userId = '123';
        req.body = {
            firstName: 'John',
            lastName: 'Doe',
            // ... rest of the body properties ...
        };

        await JobseekerController.your_profile(req, res);

        expect(User.findByIdAndUpdate).not.toHaveBeenCalledWith('123', { $set: { Name: 'DoeJohn' } }, { new: true, useFindAndModify: false });
    });
    it('should handle incorrect user ID', async () => {
        req.session.userId = 'incorrect-id';
        req.body = {
            firstName: 'John',
            lastName: 'Doe',
            // ... rest of the body properties ...
        };
    
        User.findByIdAndUpdate.mockImplementationOnce(() => {
            throw new Error('User not found');
        });
    
        await JobseekerController.your_profile(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.redirect).toHaveBeenCalledWith('/');
    });
    it('should handle missing first name or last name', async () => {
        req.session.userId = '123';
        req.body = {
            firstName: 'John',
            // lastName is missing
            // ... rest of the body properties ...
        };
    
        User.findByIdAndUpdate.mockResolvedValueOnce();
    
        await JobseekerController.your_profile(req, res);
    
        expect(User.findByIdAndUpdate).toHaveBeenCalledWith('123', { $set: { Name: 'John' } }, { new: true, useFindAndModify: false });
    });
});