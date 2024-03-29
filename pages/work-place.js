import Route from 'next/router';
import { useUser } from '../services/hooks';
import { fetchJobs } from '../services/methods';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import JobTable from '../components/jobTable';

export default function WorkPlace() {
    const [user, setUser] = useState({});
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function Exec() {
            // fetch user
            const user = await useUser();
            setUser(user);
            // if user is valid
            if (user && user.type !== 'employer') {
                setLoading(false);
                // fetch job
                const jobs = await fetchJobs();
                setJobs(jobs);
            }
            else Route.push('/');
        }
        Exec();
    }, [])

    return (
        <Layout title="Work Place">
        <div className={styles.container}>
            {
                user && !loading ?
                <>
                    <h1>Work Pool</h1> 
                    <JobTable jobs={jobs} />
                </>
                :
                <h1>Access Denied</h1>
            }
        </div>
        </Layout>
    )
}
