import { useEffect } from 'react';
import Route from 'next/router';
import { useUser } from '../../services/hooks';
import Layout from '../../components/layout';
import JobForm from '../../components/jobForm';
import styles from '../../styles/Home.module.css';

export default function Job() {
    useEffect(() => {
        async function Exec() {
            const user = await useUser()
            if (user.type === 'employee') Route.push('/profile');
        }
        Exec();
    }, [])

  return (
    <Layout title="home">
      <div className={styles.container}>
        <h1>Post Your Job</h1>
        <JobForm />
      </div>
    </Layout>
  )
}
