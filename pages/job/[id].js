import { useEffect, useState } from "react";
import Route from 'next/router';
import styles from "../../styles/Home.module.css";
import Layout from "../../components/layout"
import { fetchJobById } from "../../services/methods";
import { useUser } from "../../services/hooks";
import Job from "../../components/job";
import OwnerBanner from "../../components/ownerBanner";
import WorkerBanner from "../../components/workerBanner";

export async function getServerSideProps(context) {
    return {
        props: {
            id: context.params.id
        }
    }
}

export default function JobSpecific({ id }) {
    const [job, setJob] = useState({})
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({});
    const [owner, setOwner] = useState(false);
    const [worker, setWorker] = useState(false);

    useEffect(() => {
        async function Exec() {
            // fetch user
            const user = await useUser();
            setUser(user)
            // if user is valid
            if (user) {
                // fetch job
                const job = await fetchJobById(id);
                setJob(job);
                setOwner(user._id === job.employer._id);
                if (!owner) {
                    job.employees.forEach(e => {
                        if (e._id === user._id) setWorker(true);
                    })
                }
                setLoading(false);
            }
            else Route.push('/');
        }
        Exec();
    }, [owner, worker])

    return (
        <Layout title={`Job - ${job.title}`}>
            { owner ? <OwnerBanner /> : null }
            { worker ? <WorkerBanner /> : null }
            <div className={styles.container}>
                {
                    loading ?
                        <h1>Loading, please wait ...</h1>
                    :
                        <Job job={job} owner={false} />
                }
            </div>
        </Layout>
    )
}
