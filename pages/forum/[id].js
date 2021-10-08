import Route from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { deleteQueryById, fetchQueryById, updateQueryStatus } from "../../services/methods";
import ErrorBanner from "../../components/errorBanner";
import { useUser } from "../../services/hooks";
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
    const [user, setUser] = useState({});

    useEffect(() => {
        async function Exec() {
            const user = await useUser();
            setUser(user)
            if (!user) {
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
    }, []);

    const DeleteQuery = async () => {
        if (!confirm('Are you sure? Because can\'t undo this action later!')) return;
        const res = await deleteQueryById(id);
        if (res) Route.push('/forum');
        else setError('Cant delete forum with more than 2 messages in discussions or you don\'t have right permissions! if latter, please speak admin.');
    }

    const AlterStatus = async () => {
        const res = await updateQueryStatus(id);
        if (res) Route.reload(window.location.pathname);
        else setError('Error occured while changing query status! Try again later');
    }
    
    return (
        <Layout title="ByHelp Forum | Query">
            { error ? <ErrorBanner error={error} /> : null }
            {
                loading ?
                    <div className={styles.container}>
                        <h1>Loading please wait</h1>
                    </div>
                :
                    query ?
                    <div id="main" className={styles.container1}>
                        <h1>{query.question}</h1>
                        <div id="opts">
                            <p className="writer"><strong>By:</strong> <em>{query.by.username}</em></p>
                            <p className="resolved"><strong>Status:</strong> {query.resolved ? "Closed" : "Open"}</p>
                        </div>
                        {
                            user._id == query.by._id || user.type === 'admin' ?
                            <div id="actions">
                                <p>Actions :</p>
                                <img title="delete query" onClick={() => DeleteQuery()} alt="delete btn" src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-solid-kiranshastry.png"/>
                                {
                                    user.type === 'admin' ?
                                        query.resolved ?
                                        <img title="reopen query" onClick={() => AlterStatus()} alt="reopen btn" src="https://img.icons8.com/material-sharp/24/000000/restart--v2.png"/>
                                        :
                                        <img title="close query" onClick={() => AlterStatus()} alt="close btn" src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-close-seo-and-media-flatart-icons-flat-flatarticons.png"/>
                                    :
                                        null
                                }
                            </div> :
                            null
                        }
                        <Discussion id={id} resolved={query.resolved} discussions={query.discussions} owner={query.by._id} />
                    </div>
                    :
                    <div className={styles.container}>
                        <h1>Query Not Found</h1>
                    </div>
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
                #actions { 
                    display: flex;
                    align-items: center;
                }
                #actions img {
                    border: 2px solid #333;
                    width: 22px;
                    margin-left: 1em;
                    cursor: pointer;
                }
                #actions p {
                    padding: 4px 10px;
                    background: #333;
                    color: white
                }
            `}</style>
        </Layout>
    )
}