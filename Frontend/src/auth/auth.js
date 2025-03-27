const BASE_URL = "http://127.0.0.1:5000";

export const getAccessToken =  ()=>{
    return localStorage.getItem("accessToken");
}

export const loginUser = async (setLoading,setErrorMessage,email,password)=>{
    const API_OPTIONS ={
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    try {
        
        const response = await fetch(`${BASE_URL}/login`,API_OPTIONS);

        if (response.ok) {
          const data = await response.json();

          // Store user data and token in localStorage
          localStorage.setItem('user', JSON.stringify(data.user)); // Store user info
          localStorage.setItem('token', data.token); // Store JWT token

        //   // Optionally, you can redirect the user after login
        //   history.push('/dashboard'); // Redirect to dashboard or home page
        return data;
        } else {
          const data = await response.json();
          setErrorMessage(data.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Network error. Please try again.');
        console.error('Error during login:', error);
      } finally {
        setLoading(false);
      }
};
export const signupuser = async (name,email,phone, password, setErrorMessage, setLoading)=>{
    const API_OPTIONS = {
        
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "phone_number": phone,
             "name": name,
              "password" : password,
            }),
    }
    try {
        const response = await fetch(`${BASE_URL}/register`, API_OPTIONS);

        const data = await response.json();

        if (response.ok) {
            console.log(data);
          return data;
        } else {
          setErrorMessage(data.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        setErrorMessage("Network error. Please try again.");
        console.error('Error during sign up:', error);
        return null;
      } finally {
        setLoading(false);
        return null;
      }
    }