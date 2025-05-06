import { useState } from 'react';
import { Eye, EyeOff, Lock, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  // States for form inputs
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // States for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // States for form feedback
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error', or null
  const [formMessage, setFormMessage] = useState('');
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Password strength indicator
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ''
  });
  
  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };
  
  // Check password strength
  const checkPasswordStrength = (password) => {
    // Reset strength
    let score = 0;
    let feedback = '';
    
    if (password.length === 0) {
      setPasswordStrength({ score: 0, feedback: '' });
      return;
    }
    
    // Check length
    if (password.length >= 12) {
      score += 2;
    } else if (password.length >= 8) {
      score += 1;
    }
    
    // Check for lowercase and uppercase letters
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      score += 1;
    }
    
    // Check for numbers
    if (/\d/.test(password)) {
      score += 1;
    }
    
    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    }
    
    // Set feedback based on score
    if (score <= 1) {
      feedback = 'Weak password';
    } else if (score <= 3) {
      feedback = 'Moderate password';
    } else {
      feedback = 'Strong password';
    }
    
    setPasswordStrength({ score, feedback });
  };
  
  // Handle input changes
  const handleInputChange = (e, field) => {
    const { value } = e.target;
    
    // Clear any previous errors
    setErrors({
      ...errors,
      [field]: ''
    });
    
    // Clear any previous form status
    if (formStatus) {
      setFormStatus(null);
      setFormMessage('');
    }
    
    // Update the appropriate state
    switch (field) {
      case 'currentPassword':
        setCurrentPassword(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        checkPasswordStrength(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };
  
  // Validate the form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    
    // Check if current password is provided
    if (!currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
      isValid = false;
    }
    
    // Check if new password is provided
    if (!newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
      isValid = false;
    }
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    // Check if new password is same as current password
    if (newPassword === currentPassword && newPassword.trim()) {
      newErrors.newPassword = 'New password must be different from current password';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission using Toastify
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate API call to change password
      setTimeout(() => {
        // Show success toast notification
        toast.success('Password changed successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          icon: <CheckCircle className="text-green-500" size={18} />
        });
        
        // Also update form status for in-form feedback
        setFormStatus('success');
        setFormMessage('Password changed successfully!');
        
        // Reset form
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordStrength({ score: 0, feedback: '' });
      }, 1000);
    } else {
      // Show error toast when validation fails
      toast.error('Please fix the errors in the form', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: <AlertTriangle className="text-red-500" size={18} />
      });
    }
  };
  
  // Render password strength indicator
  const renderPasswordStrengthIndicator = () => {
    if (newPassword.length === 0) return null;
    
    const { score, feedback } = passwordStrength;
    let barClasses = 'h-1.5 rounded-full mt-1';
    let barWidth = '0%';
    let textColor = 'text-gray-500';
    
    switch (score) {
      case 1:
        barClasses += ' bg-red-500';
        barWidth = '25%';
        textColor = 'text-red-500';
        break;
      case 2:
        barClasses += ' bg-orange-500';
        barWidth = '50%';
        textColor = 'text-orange-500';
        break;
      case 3:
        barClasses += ' bg-yellow-500';
        barWidth = '75%';
        textColor = 'text-yellow-500';
        break;
      case 4:
      case 5:
        barClasses += ' bg-green-500';
        barWidth = '100%';
        textColor = 'text-green-500';
        break;
      default:
        barClasses += ' bg-gray-300';
        barWidth = '10%';
        break;
    }
    
    return (
      <div className="mt-1 mb-3">
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className={barClasses} style={{ width: barWidth }}></div>
        </div>
        <p className={`text-xs mt-1 ${textColor}`}>{feedback}</p>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-screen mx-auto">
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
        <p className="text-gray-600">Manage your account security preferences</p>
      </div>
      
      {/* Password Change Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Lock className="mr-2 text-blue-600" size={20} />
          <h3 className="text-lg font-medium text-gray-800">Change Password</h3>
        </div>
        
        {/* Form Status Message */}
        {formStatus && (
          <div className={`mb-4 p-3 rounded-md ${formStatus === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center">
              {formStatus === 'success' ? (
                <CheckCircle className="text-green-500 mr-2" size={18} />
              ) : (
                <AlertTriangle className="text-red-500 mr-2" size={18} />
              )}
              <p className={`text-sm ${formStatus === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {formMessage}
              </p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Current Password */}
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => handleInputChange(e, 'currentPassword')}
                className={`w-full p-2 pr-10 border ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex="-1"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
            )}
          </div>
          
          {/* New Password */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => handleInputChange(e, 'newPassword')}
                className={`w-full p-2 pr-10 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex="-1"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
            )}
            {renderPasswordStrengthIndicator()}
          </div>
          
          {/* Confirm New Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, 'confirmPassword')}
                className={`w-full p-2 pr-10 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex="-1"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          
          {/* Password Requirements */}
          <div className="bg-gray-50 p-3 rounded-md mb-6 border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Password requirements:</p>
            <ul className="text-xs text-gray-600 space-y-1 pl-5 list-disc">
              <li>At least 8 characters long</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Include at least one number</li>
              <li>Include at least one special character (e.g., !@#$%)</li>
            </ul>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
      
      {/* Two-Factor Authentication Section */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ShieldCheck className="mr-2 text-blue-600" size={20} />
            <h3 className="text-lg font-medium text-gray-800">Two-Factor Authentication</h3>
          </div>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Not Enabled</span>
        </div>
        <p className="text-gray-600 mb-4">
          Add an extra layer of security to your account by requiring a verification code in addition to your password.
        </p>
        <button
          type="button"
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => toast.info('Two-factor authentication setup will be available soon!', {
            position: "top-right",
            autoClose: 3000
          })}
        >
          Enable Two-Factor Authentication
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;