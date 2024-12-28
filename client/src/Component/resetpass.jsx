import React from "react";
import logo from '../Assets/logo2.png'
import question from '../Assets/question.png'
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div
    className="min-h-screen flex items-center justify-center bg-[#fff7ef] bg-cover bg-center"
    style={{ backgroundImage: `url(${question})` }}
  >
      {/* Main Reset Password Panel */}
      <div className="bg-[#d2e9e9] w-[500px] h-[400px] sm:w-[550px] sm:h-[500px] rounded-lg shadow-lg flex flex-col items-center justify-center p-6">
        {/* Company Logo */}
        <img
          src={logo} // Replace with the actual path to your logo
          alt="Company Logo"
          className="h-26 w-24 mb-4 object-contain" // Adjust height and spacing as needed
        />
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-black mb-2">
          RESET PASSWORD
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Please enter your new password
        </p>
        {/* Form */}
        <form className="w-[90%]">
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-[#d2e9e9] focus:outline-none"
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-[#d2e9e9] focus:outline-none"
              placeholder="Confirm your password"
            />
          </div>
          {/* Submit Button */}
          <button
          onClick={handleSubmit}
        type="submit"
        className="w-full py-2 bg-[#e5cca3] text-black font-semibold rounded-md hover:bg-[#f8b56a] transition"
      >
        Submit
      </button>
       
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
