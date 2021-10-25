import Link from "next/link";

export default function JobTable({ jobs }) {
    return (
        <>
            <div className="table">
                <div className="head">
                    <div className="row">
                        <p className="title"><strong>Job</strong></p>
                        <p className="status"><strong>status</strong></p>
                        <p className="employer"><strong>Employer</strong></p>
                    </div>
                </div>
                <div className="body">
                    { jobs.length > 0 ? jobs.map((job, i) => (
                        <Link key={i} href={`/job/${job._id}`}><a>
                        <div className="row job">
                            <p>{job.title}</p>
                            <p>{job.status}</p>
                            <p>{job.employer.username}</p>
                        </div></a>
                        </Link>
                    )) : <div className="row job"><p>No jobs available at the moment!</p><p></p><p></p></div> }
                </div>
            </div>

            <style jsx>{`
                .table {
                    widht: 1000px;
                    border-bottom: 1px solid black;
                }
                .row {
                    border-top: 1px solid black;
                    border-left: 1px solid black;
                    border-right: 1px solid black;
                    display: grid;
                    grid-template-columns: 700px 150px 150px;
                    text-align: center;
                    padding: 1em .4em; 
                }
                .title, .employer, .status {
                    text-align: left;
                } 
                .job {
                    text-align: left;
                }
                .job:hover {
                    color: white;
                    background: #444;
                    transition: all .4s ease;
                }
                @media screen and (max-width: 1150px) {
                    .table {
                        width: 100%;
                    }
                    .row {
                        grid-template-columns: 70% 15% 15%;
                        font-size: 15px;
                    }
                }
                @media screen and (max-width: 500px) {
                    .row {
                        grid-template-columns: 60% 20% 20%;
                        font-size: 13px;
                    }
                }
            `}</style>
        </>
    )
}
