import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getQueries } from '../../services/methods';
import Layout from '../../components/layout';
import styles from '../../styles/Forum.module.css';
import ErrorBanner from '../../components/errorBanner';
import PostQuery from '../../components/postQuery';

export default function Forum() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function Exec() {
            const queries = await getQueries();
            if (queries) {
                setQuestions(queries);
                setLoading(false);
            }
            else setError('questions not loaded. try again later')
        }
        Exec();
        return () => {
            setQuestions([]);
            setError('');
        }
    }, []);

    return (
        <Layout title="ByHelp Forum">
            { !loading && error ? <ErrorBanner error={error} /> : null }
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>ByHelp Forum</h1>
                    <small>Let's Clear Your Doubts</small>
                </header>
                <main>
                    <div className={styles.post}>
                        <p>Try finding your query below, if it isn't available.</p>
                        <p>Then post it here, and One of us will respond soon!</p>
                        <div>
                            <PostQuery />
                        </div>
                    </div>
                    <div className={styles.main}>
                        <h1>Latest Questions</h1>
                        {
                            loading ?
                            <div><h2>Loading, Please Wait...</h2></div> :
                            questions.map((q, i) => (
                                <div className={styles.ques} key={i}>
                                    <Link href={`/query/${q._id}`}><a>
                                        <h1>{q.question}</h1>
                                        <p>By {q.by.username}</p>
                                    </a></Link>
                                </div>
                            ))
                        }
                    </div>
                </main>
            </div>
        </Layout>
    )
}
