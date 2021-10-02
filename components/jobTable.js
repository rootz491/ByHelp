import Link from "next/link";

export default function JobTable({ jobs }) {
    return (
        <>
            <div className="table">
                <div className="head">
                    <div className="row">
                        <p className="title"><strong>Job</strong></p>
                        <p className="description"><strong>Description</strong></p>
                        <p className="employer"><strong>Employer</strong></p>
                        {/* <p><strong>Current Employees</strong></p> */}
                    </div>
                </div>
                <div className="body">
                    { jobs.length > 0 ? jobs.map((job, i) => (
                        <Link key={i} href={`/job/${job.id}`}><a>
                        <div className="row job">
                            <p className="title">{job.title}</p>
                            <p className="description">{job.description}</p>
                            <p className="employer">{job.employer}</p>
                            {/* <p className="ce">{job.currentEmployees}</p> */}
                        </div></a>
                        </Link>
                    )) : <div className="row job"><p></p><p>No jobs available at the moment!</p><p></p></div> }
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
                    grid-template-columns: 400px 550px 150px;
                    text-align: center;
                    padding: 1em .4em; 
                }
                .title, .description {
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
                        grid-template-columns: 30% 55% 15%;
                        font-size: 15px;
                    }
                }
                @media screen and (max-width: 500px) {
                    .row {
                        grid-template-columns: 30% 40% 25%;
                        font-size: 13px;
                    }
                }
            `}</style>
        </>
    )
}
