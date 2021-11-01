import Layout from '../components/layout';
import styles from '../styles/Home.module.css';
import { getFaq } from '../services/methods';

export async function getStaticProps() {
    const qa = await getFaq();

    return {
        props: {
            qa
        }
    }
}

export default function Help({ qa }) {
  return (
    <Layout title="home">
      <div id="container" className={styles.container}>
        <h1>Frequently Asked Questions</h1>
        <ul id="main">
            {
                qa.map((x, i) => 
                    <li key={i}>
                        <h4>{x.q}</h4>
                        <p dangerouslySetInnerHTML={{ __html: x.a }}></p>
                    </li>
                )
            }
        </ul>
        <div className="more">
            <p>If you still have any doubts, you can as us via posting it as a <a href="/forum">query</a> on our forum or can contact us directly through provided contact number.</p>
        </div>
      </div>

      <style jsx>{`
        #container {
            width: 70%;
            margin: auto;
            margin-bottom: 2em;
        }
        #main {
            margin: 3.5em 0;
        }
        .more {
            margin: 1em 0;
            padding-left: 1em;
            border-left: 4px solid gray;
        }
        .more > p {
            color: gray;
        }
        .more a {
            text-decoration: underline;
            font-weight: bold;
        }
        h1 {
            text-align: center;
        }
        li {
            margin: 1em 0;
            text-align: justify;
        }
        @media screen and (max-width: 600px) {
            #container {
                width: 90%;
            }
        }
      `}</style>
    </Layout>
  )
}
