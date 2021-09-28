import { useEffect } from 'react';
import Route from 'next/router';
import { useAuth } from '../services/hooks';
import Layout from '../components/layout';
import LoginForm from '../components/loginForm';
import styles from '../styles/Home.module.css';

export default function LoginPage() {
    useEffect(() => {
        async function Exec() {
            if (await useAuth()) Route.push('/profile');
        }
        Exec();
    }, [])

  return (
    <Layout title="home">
      <div className={styles.container}>
        <h1>Login Form</h1>
        <LoginForm />
      </div>
    </Layout>
  )
}
