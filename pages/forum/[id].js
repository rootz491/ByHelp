import Route from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { fetchQueryById } from "../../services/methods";
import ErrorBanner from "../../components/errorBanner";
import { useAuth } from "../../services/hooks";
import styles from "../../styles/Forum.module.css";

export async function getServerSideProps(context) {
    return {
        props: {
            id: context.params.id
        }
    }
}

export default function QuerySpecific({ id }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [query, setQuery] = useState({});

    useEffect(() => {
        async function Exec() {
            const auth = await useAuth();
            if (!auth) {
                setError('User Not Authenticated, try again later!');
                Route.push('/login');
            }
            const query = await fetchQueryById(id);
            if (query) {
                console.log(query.discussions);
                setQuery(query);
            }
            else setError('Query Not Found');
            setLoading(false);
        }
        Exec();
    }, [])


    return (
        <Layout title="ByHelp Forum | Query">
            { error ? <ErrorBanner error={error} /> : null }
            {
                loading ?
                    <h1>Loading please wait</h1>
                :
                    query ?
                    <div id="main" className={styles.container1}>
                        <h1>{query.question}</h1>
                        <p className="writer">Asked By <em>{query.by.username}</em></p>
                    </div>
                    :
                    <h1>Query Not Found</h1>
            }

            <style jsx>{`
                h1 {
                    text-align: center;
                    padding-top: 2em;
                }
                p.writer {
                    text-align: center;
                    padding: 1em 0;
                }
            `}</style>
        </Layout>
    )
}