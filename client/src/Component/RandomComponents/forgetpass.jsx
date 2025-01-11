import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo2.png'
import question from '../../Assets/question.png'
const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSendLink = () => {
    navigate('/resetpass');
  };


  return (
    <div
    className="min-h-screen flex items-center justify-center bg-[#fff7ef] bg-cover bg-center"
    style={{ backgroundImage: `url(${question})` }}
  >
      
      {/* Blue Panel */}
      <div className="bg-[#d2e9e9] w-[500px] h-[500px] sm:w-[550px] sm:h-[500px] rounded-lg shadow-lg flex flex-col items-center justify-center p-6">
      
        {/* Company Logo */}
        <img
          src={logo} // Replace with the actual path to your logo
          alt="Company Logo"
          className="h-26 w-24 mb-4 object-contain" // Adjust height and spacing as needed
        />
        {/* Title */}
        <h2 className="text-xl font-bold mb-6">Forgot Your Password?</h2>
        {/* Subtitle */}
        <p className="text-gray-700 text-center mb-6">
          Please enter the email address of your account to get the link that
          will redirect you to the page to reset your password.
        </p>
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        {/* Send Link Button */}
        <button
          onClick={handleSendLink}
          className="w-full p-3 bg-[#e5cca3] text-black rounded-md hover:bg-yellow-400"
        >
          Send Link
        </button>
      </div>
    </div>
   
  );
};

export default ForgotPassword;
