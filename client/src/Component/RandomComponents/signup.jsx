import React, { useEffect, useState } from "react";
import logpic from "../../Assets/login.png";
import log2 from "../../Assets/logo1.png";
import google from "../../Assets/google.svg";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from '../../Auth/SupabaseClient';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faXmark } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from 'react-hot-toast';


const url = process.env.REACT_APP_API_URL;

const SignUp = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("employee");
  const [isEmployee, setIsEmployee] = useState(true);
  const [popVisible, setPopVisible] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const tempData = JSON.parse(sessionStorage.getItem("tempData"));
    supabase.auth.getSession().then(({ data }) => {
      // console.log("Session from getSession:", data.session);
      setSession(data.session);
      if (data.session) {
        console.log(data.session.user);
        const metadata = data.session.user.user_metadata;
        const userData = {
          email: metadata.email,
          name: metadata.name,
          full_name: metadata.full_name,
          profile: metadata.picture,
          userType: tempData.isEmployee ? "employee" : "employer",
        }
        
        checkExistingUser(userData.email, userData.userType).then((res) => {
          if (res) {
            SignUpFromOAuth(userData).then((res) => {
              console.log("Signup from OAuth:", res);
              if (res) {
                if (tempData.isEmployee) {
                  localStorage.setItem("employee", JSON.stringify(res.uuid));
                }
                else {
                  localStorage.setItem("employer", JSON.stringify(res.uuid));
                }
                navigate("/dashboard");
              }
              else {
                toast.error("Signup failed!", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progressClassName: "bg-white",
                });
              } 
            });
          }
          else {
            fetchUserID(userData.email, userData.userType).then((data) => {
              if (tempData.isEmployee) {
                localStorage.setItem("employee", JSON.stringify(data.data));
              }
              else {
                localStorage.setItem("employer", JSON.stringify(data.data));
              }
              navigate("/dashboard");
            });
          }
        });
        console.log(userData);
        sessionStorage.setItem("session", JSON.stringify(data.session));
      }
    });
  }, []);



  const checkExistingUser = async (email, type) => {
    const response = await fetch(`${url}/exists-user?email=${email}&type=${type}`);
    return response.status === 200;
  }

  const fetchUserID = async (email, type) => {
    const response = await fetch(`${url}/fetch-user-id?email=${email}&type=${type}`);
    return response.json();
  }

  const SignUpFromOAuth = async (data) => {
    const response = await fetch(`${url}/signup/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }


  console.log(session);

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
    if(!newUser.username || !newUser.email || !newUser.password || (newUser.userType === "employer" && (!newUser.company || !newUser.role))) {
      toast.error("Please fill all the fields!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressClassName: "bg-white",
      });
      return;
    }
    let isValid;
    try {
      const emailverify = await fetch(`http://localhost:5000/verify-email?email=${newUser.email}`);
      isValid = await emailverify.json();
    } catch (error) {
      console.error("Error verifying email:", error);
    }
    console.log(isValid.result);
    if (isValid.result === "invalid") {
      toast.error("Insert a valid email!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressClassName: "bg-white",
      });
    }
    else {
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
          navigate("/login");
        } else {
          console.error("Signup Failed:", data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleGoogleAuth = async () => {
    setPopVisible(true);
  }

  const handleGoogleAuthEmployee = async () => {
    setPopVisible(false);
    setIsEmployee(true);
    const tempData = {
      isEmployee: true,
      isEmployer: false,
      type: "signup"
    }
    sessionStorage.setItem("tempData", JSON.stringify(tempData));

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/signup',
        scopes: "https://www.googleapis.com/auth/calendar.events",
      }
    });
  }

  const handleGoogleAuthEmployer = async () => {
    setPopVisible(false);
    setIsEmployee(false);
    const tempData = {
      isEmployee: false,
      isEmployer: true,
      type: "signup"
    }
    sessionStorage.setItem("tempData", JSON.stringify(tempData));

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/signup'
      }
    });
  }

  return (
    <AnimatePresence>
      <Toaster />
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
                      className="mt-1 p-4 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      className="mt-1 p-4 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      className="mt-1 px-3 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      className="mt-1 p-4 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  <div className="mb-4 text-center relative"
                    onClick={handleGoogleAuth}
                  >
                    <button
                      className="inline-block w-full rounded-md bg-[#FFFFFF] px-6 py-2.5 text-sm font-medium text-black shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      type="button"
                    >
                      Sign up with Google
                    </button>
                    <img
                      src={google}
                      alt="Google logo"
                      className="w-6 absolute h-6 left-20 top-2 inline-block ml-2"
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
        {popVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded-md shadow-md">
              <button
                onClick={() => setPopVisible(false)}
                className="absolute top-0 right-1 text-red-500 font-bold hover:text-red-700 transition-all scale-100 hover:scale-125"
              >
                <FontAwesomeIcon icon={faXmark} size="l" />

              </button>
              <h2 className="text-xl text-center font-semibold mb-4">Please select your type?</h2>
              <div className="flex flex-col gap-2 justify-end mt-4">
                <button
                  onClick={handleGoogleAuthEmployee}
                  className="px-4 py-2 w-full bg-gray-200 rounded-md mr-2 hover:bg-gray-300 transition-all"
                >
                  Emplpyee/Fresher
                </button>
                <button
                  onClick={handleGoogleAuthEmployer}
                  className="flex w-full justify-center items-center space-x-2 px-3 py-1 bg-green rounded-md font-normal text-sm text-white shadow-lg transition-all  h-10 duration-250 overflow-hidden group hover:shadow-xl hover:bg-green-700"
                >
                  Employer
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.section>
    </AnimatePresence>
  );
};

export default SignUp;
