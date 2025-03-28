const API_BASE_URL = "http://127.0.0.1:5000"; // Ensure this matches your backend's address

export const getalljobs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/get-all-jobs`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
        throw error;
    }
};