import { useUser } from '../services/hooks';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import { fetchJobs } from '../services/methods';
import JobTable from '../components/jobTable';

export default function Profile() {
    const [user, setUser] = useState({});
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function Exec() {
            const user = await useUser();
            setUser(user);
            if (user.type === 'employer') {
                const jobs = await fetchJobs();
                setJobs(jobs);
            }
        }
        Exec();
    }, [])

    return (
        <Layout title="home">
        <div className={styles.container}>
            {
                user ?
                <>
                    <h1>Welcome {user.username}</h1> 
                    <p>You are registered as <strong>{user.type}</strong></p>
                    {/* if it's employer, then show him jobs posted by him only, cos he cant access other's jobs anyway so ... yeah */}
                    { user.type === 'employer' ? 
                        jobs.length > 0 ?
                            <>
                            <h3>Your Jobs</h3>
                                <JobTable jobs={jobs} />
                            </>
                            :
                            <h4>Sorry you haven't posted any jobs yet!</h4>
                        : null
                    }
                </>
                :
                <h1>Access Denied</h1>
            }
            <style jsx>{`
                p {
                    color: grey;
                    margin: 1em 0;
                }
                a {
                    padding: 4px 9px;
                    color: white;
                    background: #444;
                    border-radius: 4px;
                    transition: all .3s ease;
                }
                a:hover {
                    color: #444;
                    background: #FFF;
                    text-decoration: underline;
                }
            `}</style>
        </div>
        </Layout>
    )
}
