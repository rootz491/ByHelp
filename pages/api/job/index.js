import Job from "../../../models/job";
import isAuthenticated from "../../../middlewares/isAuthenticated";

/* Job Endpoints:

 * fetch jobs           [both]
 * create job           [employer]
 * fetch job by ID      [both]
 * delete job           [employer]
 * join job             [employee]
 * leave job            [employee]
*/

async function handler(req, res) {
    const {
        body,
        method,
        user
    } = req;

    switch(method) {

        /* fetch jobs */
        case "GET":
            let jobs;
            //  employer can't view others jobs
            if (user.type === 'employer') {
                jobs = await Job.find({employer: user._id}).select('-workers -expectedDays -isFullPaid -isTokenPaid -tokenMoney -fullMoney -description').populate('employer').exec();
            }
            //  admin and employee can see all jobs
            else {
                jobs = await Job.find().select('-workers -expectedDays -isFullPaid -isTokenPaid -tokenMoney -fullMoney -description').populate('employer').exec();
            }
            return res.json({ success: true, jobs });

        /* create job */
        case "POST":
            try {
                // check if user is `employee` or not
                if (user.type === 'employee') throw {message: "Employee cannot post job"}
                // verify fields
                const {
                    title, description, expectedDays, expectedWorkers, deadline, pincode, location
                } = body;
                if (!(title && description && expectedWorkers && expectedDays && deadline && pincode && location)) throw {message: "All fields are required"}
                console.log('hit');
                // check if pincode is valid
                const validPincodes = [123456, 123789, 123443, 123491]
                let isValidCode = false
                for (let i of validPincodes) {
                    if (i == pincode) {
                        isValidCode = true;
                        // break; // TODO maybe this break will totally break this switch-case, so have to check it first
                    }
                }
                if (!isValidCode) throw {message: "invaid pincode"} //  if code isn't valid then fail!
                //  calculate money
                const ob = calculateMoney(expectedDays, expectedWorkers)
                const {
                    fullMoney, tokenMoney
                } = ob;
                // add to DB
                const newJob = new Job({ title, description, expectedDays, expectedWorkers, deadline, address: {pincode, location}, employer: user._id, tokenMoney, fullMoney });
                return res.json({success: true, job: await newJob.save()});
            } catch (error) {
                return res.status(403).json({success: false, message: error.message});
            }
        
        default:
            return res.status(405).send();
    }
}

function calculateMoney(expectedDays, expectedWorkers) {
    //  1 worker = 400 rs
    //  service charge = 50 rs
    const fullMoney = (400 * (expectedDays * expectedWorkers)) + 50;
    // token money [advance] is 10% of full money
    const tokenMoney = fullMoney/10;
    return {
        fullMoney,
        tokenMoney
    }
}

export default isAuthenticated(handler);
