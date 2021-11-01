import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import Layout from "../../components/layout"
import { fetchJobById } from "../../services/methods";
import { useUser } from "../../services/hooks";
import Job from "../../components/job";
import Route from "next/router";

export async function getServerSideProps(context) {
    return {
        props: {
            id: context.params.id
        }
    }
}

export default function JobSpecific({ id }) {
    const [job, setJob] = useState()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({});
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        async function Exec() {
            // fetch user
            const user = await useUser();
            if (user) {
                setUser(user)

                // fetch job
                const job = await fetchJobById(id);
                setJob(job);
                setLoading(false);
                
                if (job) {
                    // check if user is `employee` and then has joined this job or not
                    job.workers.forEach(u => {
                        if (u.user._id === user._id) {
                            setJoined(true);
                        }
                    })
                }
                else Route.push('/')
            }
                else Route.push('/');
        }
        Exec();
    }, [])

    return (
        <Layout title={job?`Job - ${job.title}`:'loading'}>
            <div className={styles.container}>
                {
                    loading ?
                        <h1>Loading, please wait ...</h1>
                    :
                        job ?
                        <Job job={job} joined={joined} user={user} />
                        :
                        <h1>This Job doesn't exists ...</h1>
                }
            </div>
        </Layout>
    )
}
