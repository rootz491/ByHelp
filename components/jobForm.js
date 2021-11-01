import route from "next/router";
import { useState } from "react"
import { postJob } from "../services/methods";

export default function JobForm() {
    // title, description, expectedDays, expectedWorkers, deadline, pincode, location
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [expectedDays, setExpectedDays] = useState(0);
    const [expectedWorkers, setExpectedWorkers] = useState(0);
    const [deadline, setDeadline] = useState('');
    const [pincode, setPincode] = useState(123123);
    const [location, setLocation] = useState('');
    // states for page control
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // list of valid pincodes
    const pincodes = [123456, 123789, 123443, 123491];

    const JobPost = async e => {
        e.preventDefault();
        setLoading(true);
        const res = await postJob(title, description, expectedDays, expectedWorkers, deadline, pincode, location);
        if (res.success === true) {
            route.push('/profile');
        }
        else {
            setError(res.error);
        }
        setLoading(false)
    }

    return (
        <form method="POST" onSubmit={JobPost}>
            <input placeholder="title of the job" type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            <textarea placeholder="description of your job" value={description} onChange={e => setDescription(e.target.value)} required />
            <input placeholder="maximum days of work" type="number" value={expectedDays} onChange={e => setExpectedDays(e.target.value)} required />
            <input placeholder="maximum number of workers" type="number" value={expectedWorkers} onChange={e => setExpectedWorkers(e.target.value)} required />
            <div>
                <label htmlFor="date">deadline date</label>
                <input id="date" name="date" type="date" placeholder="deadline date i.e. 2021-11-23" min={new Date().getDate()} max="2018-12-31" value={deadline} onChange={e => setDeadline(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="pincode">pincode</label>
                <select id="pincode" name="pincode" placeholder="select your pincode" value={pincode} onChange={e => setPincode(e.target.value)} required> {
                    pincodes.map((p, i) => (
                        <option value={p} key={i}>{p}</option>
                    ))
                } </select>
            </div>
            <input type="text" placeholder="address or landmark" value={location} onChange={e => setLocation(e.target.value)} required />
            <button disabled={loading} type="submit">post</button>
            <div className="error">{error}</div>

            <style jsx>{`
                form {
                    margin: 1em auto;
                    display: grid;
                    gap: 1em
                }
                form > div > input, form > div > select {
                    padding: 4px 10px;
                    margin: 0 10px;
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
                input, textarea {
                    outline: none;
                    border: 1px solid black;
                }
                .error {
                    color: red;
                    text-align: center;
                }
            `}</style>
        </form>
    )
}
