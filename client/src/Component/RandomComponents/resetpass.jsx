import React, { useState, useEffect } from "react";
import logo from "../../Assets/logo2.png";
import question from "../../Assets/question.png";
import { useNavigate } from "react-router-dom";
import { Toaster as ToastContainer, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const url = process.env.REACT_APP_API_URL;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedemail = localStorage.getItem("emailForReset");
    if (storedemail) {
      setEmail(storedemail);
      localStorage.removeItem("emailForReset");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword != confirmPassword) {
      toast.error("Passwords do not match!", {
        style: {
          background: "#FECACA",
          color: "black",
          fontWeight: "bold",
        },
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressClassName: "bg-white",
      });
      return;
    }
    else {
      const obj = {
        email: email,
        password: newPassword
      }
      try {
        const response = await fetch(`${url}/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        const data = await response.json();
        if (response.ok) {
          navigate("/login");
        } else {
          toast.error("Error in resetting password", {
            style: {
              background: "#FECACA",
              color: "black",
              fontWeight: "bold",
            },
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progressClassName: "bg-white",
          });
        }
      } catch (err) {
        toast.error("Error in resetting password", {
          style: {
            background: "#FECACA",
            color: "black",
            fontWeight: "bold",
          },
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressClassName: "bg-white",
        });
      }
    };
  }

  return (
    <div>
      <ToastContainer />
      <div
        className="min-h-screen flex items-center justify-center bg-[#fff7ef] bg-cover bg-center"
        style={{ backgroundImage: `url(${question})` }}
      >
        <div className="bg-[#d2e9e9] w-[500px] h-[400px] sm:w-[550px] sm:h-[500px] rounded-lg shadow-lg flex flex-col items-center justify-center p-6">
          {/* Company Logo */}
          <img src={logo} alt="Company Logo" className="h-26 w-24 mb-4 object-contain" />

          {/* Header */}
          <h1 className="text-2xl font-bold text-center text-black mb-2">
            RESET PASSWORD
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Please enter your new password
          </p>

          {/* Form */}
          <form className="w-[90%]" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-[#d2e9e9] focus:outline-none"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#e5cca3] text-black font-semibold rounded-md hover:bg-[#f8b56a] transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
