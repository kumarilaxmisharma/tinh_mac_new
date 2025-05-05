import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSignupBusiness = () => {
    navigate('/signup-business');
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setError(''); // Reset any previous error messages

    // Basic validation
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      console.log('Signup successful:', data);
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  return (
    <div className="items-center max-h-screen px-120 py-20 sm:py-12 lg:py-24 mb-30">
      <form className="max-w-screen mx-auto border-1 border-gray-100 rounded-[24px] shadow-lg p-10 bg-white" onSubmit={handleSubmit}>
        <h3 className="text-3xl font-bold text-center mb-5 text-[#004AAD]">Create an account</h3>
        
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error */}

        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Your Username"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@gmail.com"
            required
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-700">Repeat password</label>
          <input
            type="password"
            id="repeat-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)} // Update repeat password state
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
          </div>
          <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-600">
            I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>
          </label>
        </div>
        
        <button type="submit" className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Register new account
        </button>

        {/* Social Signup Buttons */}
        <div className="mt-5">
          <button type="button" className="flex items-center justify-center w-full bg-white text-gray-700 hover:bg-gray-100 font-medium rounded-sm border-1 border-gray-400 text-sm px-5 py-2.5 mb-3 cursor-pointer">
            <img src="src/assets/images/logo/Google logo.png" alt="Google" className="w-5 h-5 mr-2" />
            Sign Up with Google
          </button>
          <button type="button" className="flex items-center justify-center w-full bg-white text-gray-700 hover:bg-gray-100 font-medium rounded-sm border-1 border-gray-400 text-sm px-5 py-2.5 cursor-pointer">
            <img src="src/assets/images/logo/Facebook logo.png" alt="Facebook" className="w-5 h-5 mr-2" />
            Sign Up with Facebook
          </button>
        </div>

        {/* Already have an account? Login */}
        <div className="text-center mt-5">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="text-blue-600 hover:underline focus:outline-none cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>

        {/* Sign up for business */}
        <div className="text-center mt-5">
          <p className="text-sm text-gray-600">
            Sign up for business?{' '}
            <button
              type="button"
              onClick={handleSignupBusiness}
              className="text-blue-600 hover:underline focus:outline-none cursor-pointer"
            >
              Get started
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;