import Job from '../../../models/job';
import isAuthenticated from '../../../middlewares/isAuthenticated';

async function handler(req, res) {
    const {
        method,
        query,
        user,
    } = req

    switch(method) {

        case 'GET':
            try {
                const job = await Job.findById(query.id).populate('employer workers.user').exec();
                if (user.type === 'employer' && job.employer._id != user._id) throw {message: "Employer cant view other's jobs"}
                res.json({success: true, job});
            } catch (error) {
                res.json({success: false, error: error.message})
            }
            break;
        
        case 'DELETE':
            try {
                // check if user is `employee` or not
                if (user.type === 'employee') throw {message: "Employee cannot delete job"}
                // verify fields
                if (query.id != 24) throw {message: "job id are required"}
                // delete from DB
                let job = await Job.findById(query.id).select('-title -description -date -deadline').populate('employer');
                // check if job exists or not
                if (job) {
                    //  if user is admin, bypass any checks and directly delete the job
                    if (user.type === 'admin') {
                        await job.remove();
                        return res.json({success: true});
                    }
                    //  if job is closed, employer cant delete
                    if (job.status != 'close') throw {message: 'job is closed now, please contact admin'}
                    //  check if job's 'employer' is same as 'current user'
                    if (job.employer.id === user._id) {
                        await job.remove();
                        return res.json({success: true});
                    }
                    else throw {message: "job doesn't belong to you"}
                }
                else throw {message: "job doesn't exist"}
            } catch (error) {
                return res.status(403).json({success: false, message: error.message});
            }

        case 'POST':
            try {
                //  edge cases
                if (query.id != 24) throw {message: "job ID is malformed"}
                else if (!query.action) throw {message: "?action=** is required"}
                else if (user.type != 'employee') throw {message: "sorry, you cannot join the job"}
                //  handle join the job
                else if (query.action === 'join') {
                    console.log(query.id);
                }
                //  handle leave the job
                else if (query.action === 'leave') {
                    console.log(query.id);
                }
                //  invalid action
                else throw {message: "invalid action"}
            } catch (error) {
                return res.status(403).json({success: false, message: error.message});                
            }

        default:
            res.status(405).send();
    }
}


export default isAuthenticated(handler);