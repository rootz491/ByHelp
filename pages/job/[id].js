import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import Layout from "../../components/layout"
import { fetchJobById } from "../../services/methods";
import { useUser } from "../../services/hooks";
import Job from "../../components/job";

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

    useEffect(() => {
        async function Exec() {
            // fetch user
            const user = await useUser();
            if (user) {
                setUser(user)

                // fetch job
                const job = await fetchJobById(id);
                setJob(job);
                console.log(user);
                console.log(job);
                setLoading(false);
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
                        <Job job={job} /> 
                        :
                        <h1>This Job doesn't exists ...</h1>
                }
            </div>
        </Layout>
    )
}
