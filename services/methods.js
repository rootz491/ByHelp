import { useBearer } from "./hooks";

export async function fetchJobs() {
    const res = await fetch('/api/job', {
        method: 'GET',
        headers: {
            "authorization": await useBearer()
        }
    })
    const data = await res.json();
    return data.jobs;       // return array containing jobs
}

export async function fetchJobById(id) {
    const res = await fetch(`/api/job/${id}`, {
        method: 'GET',
        headers: {
            "authorization": await useBearer()
        }
    })
    const data = await res.json();
    return data.job;
}

export async function postJob(title, description) {
    const res = await fetch("/api/job", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "authorization": await useBearer()
        },
        body: JSON.stringify({
            title, description
        })
    });
    const data = await res.json();
    return data;
}

export async function getQueries() {
    const res = await fetch("/api/query", {
        method: 'GET',
        headers: {
            "authorization": await useBearer()
        }
    })
    const data = await res.json();
    return data.queries;
}

export async function postQuestion(question) {
    const res = await fetch("/api/query", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "authorization": await useBearer()
        },
        body: JSON.stringify({
            question
        })
    })
    const data = await res.json();
    return data;
}

export async function fetchQueryById(id) {
    const res = await fetch(`/api/query/${id}`, {
        method: 'GET',
        headers: {
            "authorization": await useBearer()
        }
    })
    const data = await res.json();
    return data.query;
}

export async function deleteQueryById(id) {
    const res = await fetch(`/api/query/${id}`, {
        method: 'DELETE',
        headers: {
            "authorization": await useBearer()
        }
    })
    const data = await res.json();
    return data.success;
}

export async function updateQueryStatus(id) {
    const res = await fetch(`/api/query/${id}`, {
        method: 'PUT',
        headers: {
            "authorization": await useBearer()
        }
    })
    const data = await res.json();
    return data.success;
}

export async function getFaq() {
    // Here will be all the questions and answers. That's it. simple and steady 😂
    return [
        {
            q: "Is the token amount refundable?",
            a: "Yes, If you cancel your order at least 24 hrs before your mentioned date,if you cancel in the last 24 hrs you will get only 80% of token amount."
        },
        {
            q: "What if the worker is unable to find the place of work?",
            a: "we will provide the worker phone number of the employer."
        },
        {
            q: "What if the worker decides to not come to the work?",
            a: "you(employer) will get his phone number with which you can ask him the problem if he still refuses you can rate him and tell us that he didn't show up to get your token money refunded."
        }
    ];
}