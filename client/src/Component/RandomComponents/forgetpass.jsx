import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo2.png";
import question from "../../Assets/question.png";
import { supabase } from "../../Auth/SupabaseClient";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendLink = async (email) => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    localStorage.setItem("emailForReset", email);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/resetpass", // Update to your actual reset page
      });

      if (error) throw error;
      toast.info("Password reset email sent successfully!",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      alert("Error: " + error.message);
    }
  };

  return (
   <div>
    <ToastContainer />
     <div
      className="min-h-screen flex items-center justify-center bg-[#fff7ef] bg-cover bg-center"
      style={{ backgroundImage: `url(${question})` }}
    >
      {/* Blue Panel */}
      <div className="bg-[#d2e9e9] w-[500px] h-[500px] sm:w-[550px] sm:h-[500px] rounded-lg shadow-lg flex flex-col items-center justify-center p-6">
        {/* Company Logo */}
        <img src={logo} alt="Company Logo" className="h-26 w-24 mb-4 object-contain" />
        
        {/* Title */}
        <h2 className="text-xl font-bold mb-6">Forgot Your Password?</h2>
        
        {/* Subtitle */}
        <p className="text-gray-700 text-center mb-6">
          Please enter the email address of your account to get the link that will redirect you to the page to reset your password.
        </p>
        
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        
        <button
          onClick={() => handleSendLink(email)} 
          className="w-full p-3 bg-[#e5cca3] text-black rounded-md hover:bg-yellow-400"
        >
          Send Link
        </button>
      </div>
    </div>
   </div>
  );
};

export default ForgotPassword;
