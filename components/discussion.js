import { useState, useEffect } from "react";
import { useBearer, useUser } from "../services/hooks";
import { useRouter } from "next/router";

export default function Discussion({id, discussions, owner, resolved}) {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function Exec() {
            const user = await useUser();
            setUser(user);
        }
        Exec();
    }, []);
    
    const PostAnswer = async e => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('/api/query/discussion', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "authorization": await useBearer()
            },
            body: JSON.stringify({
                id, answer
            })
        });
        if (res.ok) router.reload(window.location.pathname);
        else alert('something went wrong, try again later');
        setLoading(false);
    }

    const DeleteAnswer = async a_id => {
        setLoading(true);
        console.log('delete hit');
        const res = await fetch('/api/query/discussion', {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                "authorization": await useBearer()
            },
            body: JSON.stringify({
                queryID: id, discussionID: a_id
            })
        });
        if (res.ok) router.reload(window.location.pathname);
        else alert('something went wrong, try again later');
        setLoading(false);
    }

    return (
        <>
            <div id="cover">
                {
                    discussions.length > 0 ?
                    discussions.map((d, i) => 
                        <div key={i}>
                        {
                            owner == d.user ? 
                            <div id="discussion" className="left">
                                <img alt="msg icon" title="user" src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-message-chat-flatart-icons-lineal-color-flatarticons-5.png"/>
                                <p className="answer">{d.answer}</p>
                                { user.type === 'admin' || owner === user._id ? <img className="delete" alt="del btn" onClick={() => DeleteAnswer(d._id)} src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-solid-kiranshastry.png"/> : null }
                            </div> 
                            :
                            <div id="discussion" className="right">
                                { user.type === 'admin' ? <img className="delete" onClick={() => DeleteAnswer(d._id)} alt="del btn" src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-solid-kiranshastry.png"/> : null }
                                <p className="answer">{d.answer}</p>
                                <img alt="msg icon" title="admin" src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/64/000000/external-message-chat-flatart-icons-solid-flatarticons-5.png"/>
                            </div>
                        }
                        </div>
                    ) :
                    <div id="wait">
                        <h3>There's no discussions happened yet!</h3>
                        <p>Maybe wait a little and someone will respond 🙂</p>
                    </div>
                }

            </div>
            {
                !resolved ?
                    user.type === 'admin' || owner === user._id ?
                    <form id="inputWrapper" onSubmit={PostAnswer}>
                        <input type="text" placeholder="type your answer here ..." value={answer} onChange={e => setAnswer(e.target.value)} required/>
                        <button disabled={loading} type="submit">post</button>
                    </form> 
                    : null
                : <h2 id="wait">This Query is closed now!</h2>
            }
            <style jsx>{`
                #cover {
                    margin-top: 2em;
                    width: 100%;
                    height: 50vh;
                    overflow-y: scroll;
                }
                #wait {
                    text-align: center;
                }
                #wait > h3 {
                    margin-bottom: 15px;
                }
                #discussion {
                    margin-top: 10px;
                    margin-bottom: 10px;
                    display: flex;
                    width: 80%;
                }
                #discussion > img {
                    margin: 0 10px;
                    width: 30px;
                    max-height: 30px;
                }
                #discussion > p {
                    flex: 1;
                }
                .right {
                    text-align: right;
                    margin-left: auto;
                }
                #inputWrapper {
                    display: flex;
                }
                input {
                    flex: 1;
                }
                input, button {
                    padding: 6px 14px;
                    font-size: 20px;
                    border: 3px solid black;
                    background: none;
                }
                button {
                    cursor: pointer;
                }
                input:focus {
                    border-color: grey;
                    outline: none;
                }
                .delete {
                    cursor: pointer;
                    display: none;
                    width: 30px;
                    height: 30px;
                }
                #discussion:hover .delete {
                    display: block;
                }
                @media screen and (max-width: 550px) {
                    input, button {
                        padding: 3px 7px;
                        font-size: 16px;
                    }
                    #discussion {
                        width: 90%;
                    }
                }
            `}</style>
        </>
    )
}
