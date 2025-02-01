import React, { useState } from "react";
import logpic from "../../Assets/login.png";
import log2 from "../../Assets/logo1.png";
import google from "../../Assets/google.svg";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const url = process.env.REACT_APP_API_URL;
console.log(url);

const SignUp = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("employee");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    company: "",
    role: "",
  });

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      userType: userType,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      ...(userType === "employer" && {
        company: formData.company,
        role: formData.role,
      }),
    };
    console.log(newUser);
    try {
      const response = await fetch(`${url}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Signup Successful:", data);
        navigate("/login");
      } else {   
        console.error("Signup Failed:", data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AnimatePresence>
      <motion.section
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.5 } }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="min-h-screen flex items-center justify-center bg-[#8DAFA8] bg-opacity-40"
      >
        <div className="container max-w-4xl">
          <div className="flex flex-col lg:flex-row rounded-lg shadow-lg dark:bg-neutral-800">
            {/* Left column container (image part) */}
            <div
              className="flex items-center justify-center lg:w-6/12 p-0 order-2 lg:order-1"
              style={{ backgroundColor: "#fff7ef" }} // Same background color as login panel
            >
              <img
                src={logpic}
                alt="Login illustration"
                className="w-full h-full object-contain rounded-l-lg lg:rounded-r-none"
              />
            </div>

            {/* Right column container (login part) */}
            <div className="lg:w-6/12 p-6 flex items-center justify-center order-1 lg:order-2 bg-[#fff7ef]">
              <div className="w-full">
                <div className="text-center">
                  <img className="mx-auto w-24" src={log2} alt="logo" />
                  <h6 className="mb-6 mt-4 text-xl font-semibold">Sign UP</h6>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Username input */}
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 ml-2"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="mt-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 ml-2"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* User type dropdown */}
                  <div className="mb-4">
                    <label
                      htmlFor="userType"
                      className="block text-sm font-medium text-gray-700 ml-2"
                    >
                      User Type
                    </label>
                    <select
                      id="userType"
                      value={userType}
                      onChange={handleUserTypeChange}
                      className="mt-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="employee">
                        Employee/Student/Fresh Graduate
                      </option>
                      <option value="employer">Employer</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 ml-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  {userType === "employer" && (
                    <>
                      <div className="mb-4">
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          placeholder="Enter your company name"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Role
                        </label>
                        <input
                          type="text"
                          id="role"
                          placeholder="Enter your role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-2 text-center">
                    <button
                      className="inline-block w-full rounded-md bg-[#8DAFA8] px-6 py-2.5 text-sm font-medium text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>

                  <div className="mb-2 text-center">
                    <p className="text-sm text-gray-600">or</p>
                  </div>

                  {/* 'Sign up with Google' button */}
                  <div className="mb-4 text-center relative">
                    <button
                      className="inline-block w-full rounded-md bg-[#FFFFFF] px-6 py-2.5 text-sm font-medium text-black shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      type="button"
                    >
                      Sign up with Google
                    </button>
                    <img
                      src={google}
                      alt="Google logo"
                      className="w-6 z-50 absolute h-6 left-20 top-2 inline-block ml-2"
                    />
                  </div>

                  {/* Back to login button */}
                  <div className="mt-4 flex items-center justify-center">
                    <p className="mr-2 text-sm">Already have an account?</p>
                    <button
                      onClick={() => navigate("/login")}
                      type="button"
                      className="rounded-md border-2 border-[000000] px-4 py-1 text-sm font-medium text-[000000] transition hover:bg-neutral-500 hover:bg-opacity-10 hover:text-[000000] focus:outline-none"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default SignUp;
