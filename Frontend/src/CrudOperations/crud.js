import { getAccessToken } from "../auth/auth";

const BASE_URL = "http://127.0.0.1:5000";

export const getalljobs = async ({ setError }) => {
    const API_OPTIONS = {
        method: "GET"
    };

    const response = await fetch(`${BASE_URL}/get-all-jobs`, API_OPTIONS);

    if (!response.ok) {
        setError("Something went wrong, please try again");
        return null;
    } else {
        const data = await response.json();
        return data.jobs;
    }
};

export const getjobdetails = async ({ setError, id }) => {
    const API_OPTIONS = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    };

    const response = await fetch(`${BASE_URL}/get-job/${id}`, API_OPTIONS);

    if (response.status !== 200) {
        setError("Something went wrong, please try again");
        return null;
    } else {
        const data = await response.json();
        return data;
    }
};

export const Create_job = async (description, job_title, job_type, location, contact_email) => {
    const API_OPTIONS = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            description,
            job_title,
            job_type,
            location,
            contact_email,
        })
    };

    const res = await fetch(`${BASE_URL}/create-job`, API_OPTIONS);

    if (res.ok) {
        return res;
    } else {
        return false;
    }
};