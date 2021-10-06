import Route from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { fetchQueryById } from "../../services/methods";
import ErrorBanner from "../../components/errorBanner";
import { useAuth } from "../../services/hooks";
import styles from "../../styles/Forum.module.css";
import Discussion from "../../components/discussion";

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
                console.log(query);
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
                        <div id="opts">
                            <p className="writer"><strong>By:</strong> <em>{query.by.username}</em></p>
                            <p className="resolved"><strong>Status:</strong> {query.resolved ? "Closed" : "Open"}</p>
                        </div>
                        <Discussion id={id} resolved={query.resolved} discussions={query.discussions} owner={query.by._id} />
                    </div>
                    :
                    <h1>Query Not Found</h1>
            }

            <style jsx>{`
                h1 {
                    padding-top: 2em;
                }
                #opts {
                    padding: 1em 0;
                    display: flex;
                    justify-content: space-between;
                }
                #main {
                    margin-bottom: 2em;
                }
            `}</style>
        </Layout>
    )
}