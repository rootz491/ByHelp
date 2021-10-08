import { useState, useEffect, useRef } from 'react';
import { postQuestion } from '../services/methods';
import ErrorBanner from './errorBanner';
import SuccessBanner from './successBanner';
import styles from '../styles/Forum.module.css';
import Route from 'next/router';

export default function PostQuery({ hidden }) {
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const formRef = useRef();

    useEffect(() => {
        formRef.current.hidden = {hidden};
        return () => {
            setQuestion('');    
            setError('');    
            setSuccess('');
            setLoading(false);
        }
    }, []);

    const PostQuestion = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        const data = await postQuestion(question);
        console.log(data);
        if (data.success === false) {
            setError(data.error);
            setSuccess('');
        }
        else {
            setQuestion('');
            setSuccess('Congratulations! your question is posted. now wait for admin\'s response');
            setTimeout(() => {
                Route.reload(window.location.pathname + `/${data._id}`);
            }, 3000);
        }
        setLoading(false);
    }

    const hideMe = () => {
        formRef.current.hidden = true;
    }

    const showMe = () => {
        formRef.current.hidden = false;
    }


    return (
        <>
            <button onClick={showMe} className={styles.btn}>post your question?</button>
            <div className="form" ref={formRef}>
                <img className="close" onClick={hideMe} src="https://img.icons8.com/ios/50/000000/cancel.png"/>
                <form onSubmit={PostQuestion}>
                    <h1>Post You Questions Here</h1>
                    <textarea type="text" placeholder="Enter your question." value={question} onChange={e => setQuestion(e.target.value)} required></textarea>
                    <div>
                        <button className={styles.btn} disabled={loading} type="submit">post</button>
                    </div>
                    { error ? <ErrorBanner error={error} /> : null }
                    { success ? <SuccessBanner success={success} /> : null }
                </form>

                <style jsx>{`
                    .close {
                        width: 30px;
                        position: absolute;
                        top: .7em; 
                        right: 1em;
                        cursor: pointer;
                    }
                    .form {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 700px;
                        height: 400px;
                        background-color: #FFF;
                        border: 1px solid black;
                        border-radius: 5px;
                        box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.2);
                        -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.2);
                        -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.2);
                    }
                    .form h1 {
                        text-align: center;
                        margin-bottom: 1em;
                    }
                    form {
                        height: 100%;
                        width: 100%;
                        display: grid;
                        place-content: center;
                    }
                    textarea {
                        width: 90%;
                        height: 100px;
                        // width: 250px;
                        margin: auto;
                        border: 2px solid black;
                        padding: 4px 9px;
                        resize: none;
                    }
                    form > div {
                        display: flex;
                        margin: 1em 0;
                    }
                    form > button {
                        cursor: pointer;
                        margin: auto;
                        border: 1px solid black;
                        background-color: #FFF;
                        padding: 4px 10px;
                    }
                    @media screen and (max-width: 720px) {
                        .form {
                            width: 90%;
                        }
                    }
                `}</style>
            </div>
        </>
    )
}
