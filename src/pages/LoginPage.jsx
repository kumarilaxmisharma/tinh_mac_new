import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';


//Create handle submit function
//event.preventDefault() to prevent the default form submission


//Create {useNavigate} hook to navigate to home page when user login


const LoginPage = () => {
  const navigate = useNavigate();

  const handleForgetPassword = () => {
    //Redirect to the forget password page
    navigate('/forget-password');

  };

  return (
    <div className=" items-center min-h-screen px-120 py-15">
      <form className="max-w-screen mx-auto border-1 border-gray-100 rounded-[24px] shadow-lg p-10 bg-white">
        <h3 className="text-3xl font-bold text-center mb-5 text-[#004AAD] ">
          Login
        </h3>
        <div className="mb-5">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          <div className="text-right mt-2">
            <button
              type="button"
              onClick={handleForgetPassword}
              className="text-sm text-blue-600 hover:underline focus:outline-none cursor-pointer"
            >
              Forget Password?
            </button>
          </div>
        </div>

        <button
          type="login"
          className="mx-auto text-white bg-[#004AAD] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer"
        >
          Log in
        </button>

        {/* Social Login Buttons */}
        <div className="mt-5">
          <button
            type="button"
            className="flex items-center justify-center w-full bg-white text-gray-700 border-1 border-gray-400 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-3 cursor-pointer"
          >
            <img
              src="src/assets/images/logo/Google logo.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Login with Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-full bg-white text-gray-700 border-1 border-gray-400 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
          >
            <img
              src="src/assets/images/logo/Facebook logo.png"
              alt="Facebook"
              className="w-5 h-5 mr-2"
            />
            Login with Facebook
          </button>
        </div>

        {/* Don't Have An account yet? Login */}
        <div className="text-center mt-5">
          <p className="text-sm text-gray-600">
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline focus:outline-none cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;