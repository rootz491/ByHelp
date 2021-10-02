import route from "next/router";
import { useState } from "react"
import { postJob } from "../services/methods";

export default function LoginForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const JobPost = async e => {
        e.preventDefault();
        setLoading(true);
        const res = await postJob(title, description);
        if (res.success === true) {
            route.push('/work-place');
        }
        else {
            setError(res.error);
        }
        setLoading(false)
    }

    return (
        <form method="POST" onSubmit={JobPost}>
            <input placeholder="Title of the job" type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            <textarea placeholder="Description of your job" value={description} onChange={e => setDescription(e.target.value)} required />
            <button disabled={loading} type="submit">post</button>
            <div className="error">{error}</div>

            <style jsx>{`
                form {
                    margin: 1em auto;
                    display: grid;
                    gap: 1em
                }
                input, button, textarea {
                    width: 500px;
                    padding: 4px 9px;
                    font-size: 20px;
                }
                textarea {
                    min-height: 150px;
                }
                button {
                    cursor: pointer;
                }
                .error {
                    color: red;
                    text-align: center;
                }
            `}</style>
        </form>
    )
}
