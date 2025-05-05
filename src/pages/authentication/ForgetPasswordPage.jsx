import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  
  // State to track which step of the forgot password flow we're on
  const [step, setStep] = useState(1);
  // State for form data
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // State for showing/hiding passwords
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // State for validation and errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Function to handle the initial form submission
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    // Basic email validation
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // If validation passes, move to step 2 (email verification)
    setEmailError('');
    setStep(2);
  };
  
  // Function to simulate checking email and moving to reset password step
  const handleCheckEmail = () => {
    // In a real app, you would verify if the user clicked the email link
    // For demo purposes, we'll just move to step 3
    setStep(3);
  };
  
  // Function to handle password reset submission
  const handleResetPassword = (e) => {
    e.preventDefault();
    
    // Password validation
    if (!newPassword) {
      setPasswordError('New password is required');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // If validation passes, reset password (in a real app, this would call an API)
    setPasswordError('');
    // Simulate successful password reset
    alert('Password reset successful! Redirecting to login page.');
    // Navigate back to login page
    navigate('/login');
  };
  
  // Function to go back to login page
  const handleBackToLogin = () => {
    navigate('/login');
  };
  
  // Render different content based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          // Step 1: Enter Email
          <>
            <div className="flex justify-center mb-6">
              <div className="text-[#004AAD] text-5xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-6 text-[#004AAD]">
              Forgot Password
            </h3>
            <p className="text-center text-gray-500 mb-6">
              We'll send you an email to reset your password.
            </p>
            <form onSubmit={handleSubmitEmail}>
              <div className="mb-6">
                <div className="flex items-center p-2 border border-gray-300 rounded-lg">
                  <span className="text-gray-400 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    id="email"
                    className="bg-transparent text-gray-600 text-sm focus:outline-none w-full border-gray-300"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-[#004AAD] hover:bg-blue-500 text-white font-medium rounded-lg text-sm px-5 py-3 text-center mb-4 transition duration-300 cursor-pointer"
              >
                Submit
              </button>
            </form>
          </>
        );
      
      case 2:
        return (
          // Step 2: Check Email
          <>
            <div className="flex justify-center mb-6">
              <div className="text-[#004AAD] text-5xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-6 text-[#004AAD]">
              Check your Email
            </h3>
            <p className="text-center text-gray-600 mb-2">
              We've sent an email to the address
            </p>
            <p className="text-center text-blue-500 font-medium mb-6">
              {email.substring(0, 3)}****{email.substring(email.indexOf('@'))}
            </p>
            <p className="text-center text-gray-600 mb-6">
              Please check your inbox (and your spam folder, just in case) for an email from Orion
            </p>
            <button
              onClick={handleCheckEmail}
              className="w-full bg-[#004AAD] hover:bg-blue-500 text-white font-medium rounded-lg text-sm px-5 py-3 text-center mb-4 transition duration-300 cursor-pointer"
            >
              Check Email
            </button>
          </>
        );
        
      case 3:
        return (
          // Step 3: Reset Password
          <>
            <div className="flex justify-center mb-6">
              <div className="text-[#004AAD] text-5xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-6 text-[#004AAD]">
              Reset Password
            </h3>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <div className="flex items-center p-2 border border-gray-300 rounded-lg bg-white">
                  <span className="text-gray-400 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    className="bg-transparent text-gray-600 text-sm focus:outline-none w-full border-gray-300"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="text-gray-400"
                  >
                    {showNewPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center p-2 border border-gray-300 rounded-lg bg-white">
                  <span className="text-gray-400 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="bg-transparent text-gray-600 text-sm focus:outline-none w-full border-gray-300"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-[#004AAD] hover:bg-blue-500 text-white font-medium rounded-lg text-sm px-5 py-3 text-center mb-4 transition duration-300 cursor-pointer"
              >
                Reset Password
              </button>
            </form>
          </>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-6">
      <div className="w-full max-w-md border-1 border-gray-100 rounded-3xl shadow-xl p-8 bg-white ">
        {/* Content changes based on step */}
        {renderStepContent()}
        
        {/* Back to Login button */}
        <div className="text-center mt-4">
          <button
            onClick={handleBackToLogin}
            className="text-xs text-gray-400 hover:text-blue-400 focus:outline-none uppercase font-medium tracking-wider cursor-pointer"
          >
            BACK TO LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;