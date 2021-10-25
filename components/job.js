import { jobJoin, jobLeave } from "../services/methods"
import router from "next/router";

export default function Job({ job, user, joined }) {

    const joinJob = async () => {
        if (!confirm('are you sure you want to join this job?')) return;
        const res = await jobJoin(job._id);
        if (res) {
            alert("job joined successfully")
            router.reload(window.location);
        }
        else alert('lol, you failed!')
    }
    
    const leaveJob = async () => {
        if (!confirm('are you sure you want to leave this job?')) return;
        const res = await jobLeave(job._id);
        if (res) {
            alert("job left successfully")
            router.reload(window.location);
        }
    }

    return (
        <>
            <h1>{job.title}</h1>
            {/* render date [later] */}
            <p>{job.description}</p>
            <div className="ee">
                <div>
                    <h2>Job Details</h2>
                    <div className="field"><h4>Status</h4> <p>{job.status}</p></div>
                    <div className="field"><h4>Posted on</h4> <p>{job.date}</p></div>
                    <div className="field"><h4>Expires on</h4> <p>{job.deadline}</p></div>
                    <div className="field"><h4>Required Days of work</h4> <p>{job.expectedDays} Days</p></div>
                    <div className="field"><h4>Required people</h4> <p>{job.expectedWorkers} people</p></div>
                    <div className="field"><h4>Joined people</h4> <p>{job.workers.length} people</p></div>

                    <h3>Address</h3>
                    <div className="field"><h4>Location</h4> <p>{job.address.location}</p></div>
                    <div className="field"><h4>Pincode</h4> <p>{job.address.pincode}</p></div>
                </div>
                <div>
                    <h2>Employer</h2>
                    <div className="field"><h4>Name</h4> <p>{job.employer.username}</p></div>
                    <div className="field"><h4>Email</h4> <p>{job.employer.email}</p></div>
                </div>
                {
                    user.type === 'employee' ? 
                        joined ?
                        <div id="join"> {/* leave job */}
                            <h1>Leave This Job 🙁</h1>
                            <button type="button" onClick={leaveJob}>leave now</button>
                        </div> 
                        :
                        <div id="join"> {/* join job */}
                            <h1>Join This Job 🙂</h1>
                            <button type="button" onClick={joinJob}>join now</button>
                        </div> 
                    : null
                }
                <div>
                    <h2>List of Employee's who've joined</h2>
                    <ol>
                    { 
                        job.workers.length > 0 ? 
                        job.workers.map((e, i) => 
                            <li key={i}><div className="field"><p>{e.user.username}</p></div></li>
                        ) : 
                        <h3>No employees joined yet</h3> 
                    }
                    </ol>
                </div>
            </div>

            <style jsx>{`
                h2 {
                    margin-bottom: 1em;
                    text-decoration: underline;
                }
                h3 {
                    color: grey;
                    text-align: center;
                }
                .field {
                    margin: 1em 0;
                    min-width: 250px;
                }
                #join {
                    margin: 1em 0;
                    text-align: center;
                }
                #join > button {
                    padding: 10px 5px;
                }
                .ee {
                    display: grid;
                }
                .ee > div {
                    margin: 2em .5em;
                    padding: 1em;
                }
                li {
                    margin: 0 1em;
                }
                @media screen and (max-width: 550px) {
                    .ee > div {
                        padding: 0;
                    }
                }
            `}</style>
        </>
    )
}
