import React from 'react'
import {Link} from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white p-6">
          <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Login</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-green-600 focus:ring-green-600"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="mt-1 w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-green-600 focus:ring-green-600"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-[#19995C] p-3 text-white font-semibold shadow-md transition-transform duration-200 hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account? <Link to='/signup' className="text-green-600 hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      );
}

export default LoginPage
