export const getalljobs = async () => {
    try {
        const response = await fetch("http://127.0.0.1:5000/get-all-jobs");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
        throw error;
    }
};

export const createJob = async (jobData, accessToken) => {
    try {
        const response = await fetch("http://127.0.0.1:5000/create-job", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}` // Include the access token
            },
            body: JSON.stringify(jobData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to create job:", error);
        throw error;
    }
};
