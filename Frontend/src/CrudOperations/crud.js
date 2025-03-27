import { getAccessToken } from "../auth/auth";

const BASE_URL = "http://127.0.0.1:5000"

export const getalljobs = async ({setError})=>{
    const API_OPTIONS = {
        method: "GET"
    }

    const response = await fetch(`${BASE_URL}/get-all-jobs`, API_OPTIONS);

    if (!response.ok){
        setError("Someting went wrong please try again");
        return null;
    }else{
        const data = await response.json();
        return data.jobs;
    }
}
export const getjobdetails = async ({setError, id})=>{
    const API_OPTIONS = {
        method: "GET",
        headers: {
            "Content-Type" :"application/json",
        }
    }

    const response = await fetch(`${BASE_URL}/get-job/${id}`, API_OPTIONS);

    if (response.status != 200 ){
        console.log(response.json());
        setError("Someting went wrong please try again");
        return null;
    }else{
        console.log(response.json())
        date = response.json();
        return data;
    }
}


export const mark_as_author_complete = async (id)=>{
    const API_OPTIONS ={
        method: 'POST',
        header: {
            "Content-Type": "Application/json",
            "Authorization": getAccessToken(),
        },
        body: JSON.stringify({"id": id})
    }

    const res = await fetch(`${BASE_URL}/autor-complete`, API_OPTIONS);
    if (res.ok){
        return true;
    }else{
        return false;
    }
};

export const mark_as_worker_complete = async (id)=>{
    const API_OPTIONS ={
        method: 'POST',
        header: {
            "Content-Type": "Application/json",
            "Authorization": getAccessToken(),
        },
        body: JSON.stringify({"id": id})
    }

    const res = await fetch(`${BASE_URL}/worker-complete`, API_OPTIONS);
    if (res.ok){
        return true;
    }else{
        return false;
    }
}


export const apply_for_job = async ()=>{
    const API_OPTIONS ={
            method: 'POST',
            header: {
                "Content-Type": "Application/json",
                "Authorization": getAccessToken(),
            },
            body: JSON.stringify({"id": id})
        }
    const res = await fetch(`${BASE_URL}/apply`, API_OPTIONS)

    if (res.ok){
        return true;
    }else{
        return false;
    }
}


export const Create_job = async (description,job_title, job_type,location,contact_email)=>{
    const API_OPTIONS ={
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "description": description,
            "job_title": job_title,
            "location": location,
            "contact_email": contact_email,
        })
    }
console.log(JSON.stringify({
    description,
    job_title,
    job_type,
    location,
    contact_email,}
))
    const res = await fetch(`${BASE_URL}/create-job`, API_OPTIONS);

    if (res.ok){
        return res;
    }else{
        return false;
    }
}