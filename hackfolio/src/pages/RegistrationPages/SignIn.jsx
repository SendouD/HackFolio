import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/userlogin/signin', {
        email,
        password,
      });
      
      localStorage.setItem("data", JSON.stringify(response.data));
      navigate('/');

      setSuccess('Sign in successful!');
      setError(null); 
    } catch (err) {
      console.log(err);
      setError('Error signing in. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Main container with increased height */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full flex min-h-[60vh]">
        {/* Left side - Sign In Form */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                {/* "Forgot Password?" Link with styling */}
                <p
                  className="text-red-600 text-md cursor-pointer hover:underline mb-4"
                  onClick={() => navigate('/forgotpassword')}
                >
                  Forgot Password?
                </p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  Sign In
                </button>
              </div>
            </form>

            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
          </div>
        </div>

        {/* Right side - Welcome Section */}
        <div className="w-1/2 bg-gray-900 text-white flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
            <p className="mb-6 text-lg">
              Register with your personal details to use all of the site features.
            </p>
            <button
              className="bg-transparent border-2 border-white text-white font-bold py-2 px-6 rounded hover:bg-white hover:text-gray-900"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;




