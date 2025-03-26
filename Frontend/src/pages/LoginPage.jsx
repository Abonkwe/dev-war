import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // For toggling password visibility
  const history = useHistory(); // Using useHistory for redirection

  const validateForm = () => {
    let isValid = true;

    // Reset error messages
    setEmailError('');
    setPasswordError('');

    // Email validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 7) {
      setPasswordError('Password must be at least 7 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      setErrorMessage('');

      try {
        // Demo: Replace with your backend API URL and endpoint
        const response = await fetch('https://your-backend-url.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.ok) {
          const data = await response.json();

          // Store user data and token in localStorage
          localStorage.setItem('user', JSON.stringify(data.user)); // Store user info
          localStorage.setItem('token', data.token); // Store JWT token

          // Optionally, you can redirect the user after login
          history.push('/dashboard'); // Redirect to dashboard or home page
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
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 w-full rounded-md p-3 shadow-sm focus:ring-green-600 ${emailError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your email"
              required
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 w-full rounded-md p-3 shadow-sm focus:ring-green-600 ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {passwordVisible ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#19995C] p-3 text-white font-semibold shadow-md transition-transform duration-200 hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {errorMessage && <p className="mt-4 text-center text-sm text-red-500">{errorMessage}</p>}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-green-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
