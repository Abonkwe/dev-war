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
        return response.json();
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

    if (!response.ok){
        setError("Someting went wrong please try again");
        return null;
    }else{
        return response.json();
    }
}