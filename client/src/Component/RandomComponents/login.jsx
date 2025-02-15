import { React, useState, useEffect, use } from "react";
import logpic from "../../Assets/login.png";
import log2 from "../../Assets/logo1.png";
import Google from "../../Assets/google.svg";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Auth/SupabaseClient";
import UniversalLoader from "../../UI/UniversalLoader";
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
const url = process.env.REACT_APP_API_URL;
const HOST = process.env.REACT_APP_HOST;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmployee, setIsEmployee] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popVisible, setPopVisible] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    if (session) {
      localStorage.setItem("userType", "user");
      navigate("/dashboard");
    }
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogIn = async (e) => {
    e.preventDefault();
    const logindata = {
      email: email,
      password: password,
    };
    if (!email || !password) {
      toast.error("Please fill all the fields", {
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
    try {
      setLoading(true);
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logindata),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        const user = {
          uuid : data.userId,
          type : data.userType
        }
        localStorage.setItem("user", JSON.stringify(user));
        if (data.userType === "employer") {
          toast.success("Login Successful", {
            style: {
              backgroundColor: "rgb(195, 232, 195)", // Sets background to green
              color: "black", // Sets text color to white
              fontWeight: "bold",
            },
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/dashboard");
        } else if (data.userType === "employee") {
          toast.success("Login Successful", {
            style: {
              backgroundColor: "rgb(195, 232, 195)", // Sets background to green
              color: "black", // Sets text color to white
              fontWeight: "bold",
            },
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
          navigate("/dashboard");
        } else {
          toast.error("Invlaid Credentials", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progressClassName: "bg-white",
          });
        }
      } else {
        toast.error("Invalid Credentials", {

          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressClassName: "bg-white",
        });
      }
    } catch (err) {
    }
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  const handleGoogleAuth = async () => {
    setPopVisible(true);
  };

  const handleGoogleAuthEmployee = async () => {
    setPopVisible(false);
    const tempData = {
      isEmployee: true,
      isEmployer: false,
      type: "login",
    }
    sessionStorage.setItem('tempData', JSON.stringify(tempData));
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${HOST}/login`,
        scopes: "https://www.googleapis.com/auth/calendar.events",
      },
    })
  }

  const handleGoogleAuthEmployer = async () => {
    setPopVisible(false);

    const tempData = {
      isEmployee: false,
      isEmployer: true,
      type: "login",
    }
    sessionStorage.setItem('tempData', JSON.stringify(tempData));
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${HOST}/login`,
        scopes: "https://www.googleapis.com/auth/calendar.events",
      },
    })
  }

  useEffect(() => {
    const tempData = JSON.parse(sessionStorage.getItem('tempData'));
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && tempData) {
        const email = data.session.user.user_metadata.email;
        const type = tempData.isEmployee ? "employee" : "employer";
        checkExistingUser(email, type).then((exists) => {
          // email check korbo
          if (exists.message === "FOUND") {
            // userID fetch korte hobe
            const userData = {
              uuid : exists.data.user_id,
              type: exists.data.user_type
            }
            localStorage.setItem("user", JSON.stringify(userData));
            navigate("/dashboard");
          }
          else {
            const metadata = data.session.user.user_metadata;
            const userData = {
              email: metadata.email,
              full_name: metadata.full_name,
              profile: metadata.picture,
              userType: tempData.isEmployee ? "employee" : "employer",
            }
            SignUpFromOAuth(userData).then((response) => {
              if (response.data) {
                const data = response.data
                const userData = {
                  uuid: data.user_id,
                  type: data.user_type
                }
                localStorage.setItem("user", JSON.stringify(userData));
                navigate("/dashboard");
              }
              else {
                toast.error("Error in OAuth Signup", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progressClassName: "bg-white",
                });
              }
            })
          }
        })
      }
    });
  }, []);

  const checkExistingUser = async (email, type) => {
    const response = await fetch(`${url}/exists-user?email=${email}&type=${type}`);
    return response.json(); // 201 means user exists
  }

  const SignUpFromOAuth = async (data) => {
    const response = await fetch(`${url}/signup/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  return (
    <div>
      <Toaster />
      <section className="min-h-screen flex items-center justify-center bg-[#8DAFA8] bg-opacity-40">
        <div className="container max-w-4xl">
          <div className="flex flex-col lg:flex-row rounded-lg shadow-lg dark:bg-neutral-800">
            {/* Left column container */}
            <div
              className="lg:w-6/12 p-6 flex items-center justify-center"
              style={{ backgroundColor: "#fff7ef" }}
            >
              <div className="w-full">
                <div className="text-center">
                  <img className="mx-auto w-24" src={log2} alt="logo" />
                  <h6 className="mb-6 mt-4 text-xl font-semibold">Login</h6>
                </div>

                <form>
                  {/* Username input */}
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 ml-2"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder="  Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 p-2 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
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
                      placeholder="  Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 p-2 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-2 relative justify-center bg-white rounded-md items-center text-center text-black shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    {loading ? (
                      <div className="z-60  w-full h-10 flex justify-center items-center cursor-not-allowed opacity-50">
                        <UniversalLoader />
                      </div>
                    ) : (
                      <button
                        className="inline-block w-full rounded-md  px-6 py-2.5 text-sm font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleLogIn}
                      >
                        Log in
                      </button>
                    )}
                  </div>

                  {/* 'or' text */}
                  <div className="mb-2 text-center">
                    <p className="text-sm text-gray-600">or</p>
                  </div>

                  {/* 'Sign up with Google' button */}
                  <div
                    className="mb-4 text-center relative"
                    onClick={handleGoogleAuth}
                  >
                    <button
                      className="inline-block w-full rounded-md bg-[#FFFFFF] px-6 py-2.5 text-sm font-medium text-black shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      type="button"
                    >
                      Continue with Google
                    </button>
                    <img
                      src={Google}
                      alt="Google logo"
                      className="w-6 absolute h-6 left-20 top-2 inline-block ml-2"
                    />
                  </div>

                  {/* Forgot password */}
                  <div className="text-center">
                    <button
                      onClick={() => navigate("/forgetpass")}
                      className="text-sm text-blue-500 underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Register button */}
                  <div className="mt-4 flex items-center justify-center">
                    <p className="mr-2 text-sm">Don't have an account?</p>
                    <button
                      type="button"
                      onClick={handleRegisterClick}
                      className="rounded-md border-2 border-[#000000] px-4 py-1 text-sm font-medium text-[#000000] transition hover:bg-neutral-500 hover:bg-opacity-10 hover:text-[#000000] focus:outline-none"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right column container with background, description, and no border */}
            <div
              className="flex items-center justify-center lg:w-6/12 p-0 order-2 lg:order-1"
              style={{ backgroundColor: "#fff7ef" }}
            >
              <img
                src={logpic}
                alt="Login illustration"
                className="w-full h-full object-contain rounded-l-lg lg:rounded-r-none"
              />
            </div>
          </div>
        </div>
        {popVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div className="relative bg-white p-6 rounded-md shadow-md"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
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
                  Employee/Fresher
                </button>
                <button
                  onClick={handleGoogleAuthEmployer}
                  className="flex w-full justify-center items-center space-x-2 px-3 py-1 bg-green rounded-md font-normal text-sm text-white shadow-lg transition-all  h-10 duration-250 overflow-hidden group hover:shadow-xl hover:bg-green-700"
                >
                  Employer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Login;
