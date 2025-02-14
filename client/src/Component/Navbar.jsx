import {
   faArrowRight,
   faBars,
   faBell,
   faRightFromBracket,
   faTimes,
   faUser,
   faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../Auth/SupabaseClient';
import NotificationList from './RandomComponents/Notifications';

const url = process.env.REACT_APP_API_URL;

const Navbar = () => {
   const userInfo = localStorage.getItem('user');
   let type = '';
   let userId = '';
   if (userInfo) {
      userId = JSON.parse(userInfo).uuid;
      type = JSON.parse(userInfo).type;
   }
   const [isOpen, setIsOpen] = useState(false);
   const [showNotifications, setShowNotifications] = useState(false);
   const navigate = useNavigate();
   const [isUser, setIsUser] = useState(false);
   const [isEmployer, setIsEmployer] = useState(false);
   const [profileClicked, setProfileClicked] = useState(false);
   const [notSeen, setNotSeen] = useState(true);
   const [notificationCount, setNotificationCount] = useState(0);
   const [activeNav, setActiveNav] = useState(null);
   const [profile, setProfile] = useState({});


   useEffect(() => {
      async function getSessionAndType() {
         const { data } = await supabase.auth.getSession();
         if (data.session) {
            const tempData = JSON.parse(localStorage.getItem('user'));
            if (tempData) {
               const currentType = tempData.type;
               setIsUser(currentType === 'employee');
               setIsEmployer(currentType === 'employer');
            }
         }
         setIsUser(type === 'employee');
         setIsEmployer(type === 'employer');
      }
      getSessionAndType();
   }, []);

   const fetchCount = useCallback(async () => {
      try {
         const value = await fetch(
            `${process.env.REACT_APP_API_URL}/notifications/count/${userId}`
         );
         const data = await value.json();
         setNotificationCount(data.unseen);
      } catch (err) {
         console.error("Error fetching notification count:", err);
      }
   }, [userId]);

   useEffect(() => {
      supabase
         .channel("notification")
         .on(
            "postgres_changes",
            {
               event: "INSERT",
               schema: "public",
               table: "notification",
               filter: `receiver_id=eq.${userId}`,
            },
            (payload) => {
               setNotSeen(false);
               fetchCount();
               //console.log(notificationCount)
            }
         )
         .subscribe();
   }, [userId, fetchCount]);

   useEffect(() => {
      if (type === 'employee') {
         setIsUser(true);
      }
      if (type === 'employer') {
         setIsEmployer(true);
      }
   }, [type]);

   const toggleNotifications = async () => {
      setShowNotifications(!showNotifications);
      try {
         const response = await fetch(
            `${process.env.REACT_APP_API_URL}/notifications/update`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ userId }),
            }
         );

         const data = await response.json();
      } catch (err) {
         console.error("Error updating notification status:", err);
      }
      setNotSeen(true);
      fetchCount();
   };
   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   const handleSignUp = () => {
      navigate("/signup");
   };

   const handleLogin = () => {
      navigate("/login");
   };

   const handleLogout = () => {
      supabase.auth.signOut();
      localStorage.clear();
      sessionStorage.clear();
      navigate('/');
   }

   const NavItemAll = [
      { name: "Home", navi: "/" },
      { name: "Roadmap", navi: "/roadmap" },
      { name: "Jobs/Internship", navi: "/jobs" },
      { name: "Skill Gap Analysis", navi: "/skill-gap" },
   ];
   const NavItemUser = [
      { name: "Dashboard", navi: "/dashboard" },
      { name: "Jobs/Internship", navi: "/jobs" },
      { name: "Roadmap", navi: "/roadmap" },
      { name: "Skill Gap Analysis", navi: "/skill-gap" },
      { name: "Applications", navi: "/applications" },
   ];
   const NavItemEmployer = [
      { name: "Dashboard", navi: "/dashboard" },
      { name: "Recent Post", navi: "/post" },
      { name: "Applicants", navi: "/applicants" },
   ];

   const allItems = [...NavItemAll, ...NavItemUser, ...NavItemEmployer];
   useEffect(() => {
      const temp = window.location.pathname.split('/');
      let final = temp[1] === "" ? "/" : ("/" + temp[1]);
      if (final === "/skill-boost")
         final = "/skill-gap";
      const found = allItems.find((item) => item.navi === final);
      setActiveNav(found ? found.name : "");
   }, []);


   useEffect(() => {
      async function fetchData() {
         const localData = JSON.parse(localStorage.getItem('user'));
         if (localData) {
            try {
               const res = await fetch(`${url}/profile/pic?id=${localData.uuid}`);
               const data = await res.json();   
               setProfile(data);
            } catch (err) {
            }
         }
      }
      fetchData();
   }, []);

   const handleClick = (item) => {
      navigate(item.navi);
   }

   useEffect(() => {
   }, [activeNav]);


   return (
      <nav className="flex font-Poppins justify-between items-center w-full h-12 md:h-16 px-6 bg-[#698C85] bg-opacity-40 backdrop-blur-md shadow-md sticky top-0 z-50">
         <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black text-xl">
               <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
         </div>
         <h1 className="text-xl font-semibold tracking-wider w-auto">CAREER CLIMB</h1>
         <ul
            className={`${isOpen ? "flex" : "hidden"} absolute top-16 ${isOpen ? "left-0 w-1/2" : ""} bg-background bg-opacity-95 md:bg-transparent md:static md:flex md:flex-row flex-col md:items-center md:space-x-5 shadow-md md:shadow-none transition-all duration-300`}
         >
            {isUser && NavItemUser.map((item, index) => (
               <li key={index} className={`px-2 py-2 md:py-3 cursor-pointer hover:border-b-2 hover:   border-y-zinc-950 hover:font-medium ${activeNav === item.name ? 'border-b-2 border-y-zinc-950 font-medium' : ''}`}
                  onClick={() => handleClick(item)}
               >
                  {item.name}
               </li>
            ))}

            {isEmployer && NavItemEmployer.map((item, index) => (
               <li key={index} className={`px-2 py-2 md:py-3 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium ${activeNav === item.name ? 'border-b-2 border-y-zinc-950 font-medium' : ''}`}
                  onClick={() => handleClick(item)}
               >
                  {item.name}
               </li>
            ))}
            {!isUser && !isEmployer && NavItemAll.map((item, index) => (
               <li key={index} className={`px-2 py-2 md:py-3 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium ${activeNav === item.name ? 'border-b-2 border-y-zinc-950 font-medium' : ''}`}
                  onClick={() => handleClick(item)}
               >
                  {item.name}
               </li>
            ))}


            {/* Mobile View Buttons */}
            {!isUser && !isEmployer && (
               <div className="flex flex-col space-y-3 px-5 py-3 md:hidden">
                  <button
                     onClick={handleLogin}
                     className="flex justify-center items-center space-x-2 px-3 py-2 bg-black rounded-md font-normal text-sm text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-white hover:text-black">
                     <span>Log In</span>
                     <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                  <button
                     onClick={handleSignUp}
                     className="flex justify-center items-center space-x-2 px-3 py-2 bg-black rounded-md font-normal text-sm text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-white hover:text-black">
                     <span>Sign Up</span>
                     <FontAwesomeIcon icon={faArrowRight} />
                  </button>
               </div>
            )}

         </ul>

         {/* Desktop View Buttons */}
         {!isUser && !isEmployer && (
            <div className="hidden md:flex md:items-center md:space-x-5">
               <button
                  className="flex justify-center items-center space-x-2 px-3 py-1 bg-black rounded-md font-normal text-sm text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-white hover:text-black"
                  onClick={handleLogin}
               >
                  <span>Log In</span>
                  <FontAwesomeIcon icon={faArrowRight} />
               </button>
               <button
                  className="flex justify-center items-center space-x-2 px-3 py-1 bg-black rounded-md font-normal text-sm text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-white hover:text-black"
                  onClick={handleSignUp}
               >
                  <span>Sign Up</span>
                  <FontAwesomeIcon icon={faArrowRight} />
               </button>
            </div>
         )}
         {(isUser || isEmployer) && (
            <div className="flex md:space-x-2 justify-center items-center">
               <button
                  className="text-black text-2xl p-2 relative"
                  onClick={toggleNotifications}
               >
                  <FontAwesomeIcon
                     icon={faBell}
                     className={`${notSeen ? "" : "animate-pulse text-green-600"} size-5 md:size-6`}
                  />
                  {notificationCount > 0 && (
                     <span className="text-xs absolute  text-white font-bold font-Bai_Jamjuree bg-red-500 rounded-full px-1 ">
                        {notificationCount}
                     </span>
                  )}
               </button>
               {showNotifications && (
                  <div className="absolute top-8 right-0">
                     <NotificationList userId={userId} setShowNotifications={setShowNotifications} />
                  </div>
               )}
               <button
                  className="text-black text-xl space-x-2 flex items-center justify-between"
                  onClick={() => setProfileClicked(!profileClicked)}
               >
                  <img
                     src={profile.profile_pic ? profile.profile_pic : faCircleUser}
                     alt="Profile"
                     className="h-10 w-10 rounded-full"
                  />
               </button>
            </div>
         )}

         {profileClicked && (
            <div className="absolute top-16 right-0 bg-green-opacity-50 bg-opacity-95 shadow-xl rounded-md w-48 h-28 p-2 flex-col items-start justify-between">
               <h1 className='text-center border-b-2 border-gray-700 font-semibold'>{profile.name}</h1>
               <ul className='flex flex-col items-start justify-start mt-2'>
                  <button className="ml-4 hover:scale-105"
                     onClick={() => {
                        navigate('/profile');
                     }}
                  >
                     <FontAwesomeIcon icon={faUser} />
                     <span className="text-lg font-normal px-2 hover:underline">View Profile</span>
                  </button>
                  <button className="ml-4 hover:scale-105"
                     onClick={handleLogout}
                  >
                     <FontAwesomeIcon icon={faRightFromBracket} />
                     <span className="text-lg font-normal px-2 hover:underline">Log Out</span>
                  </button>
               </ul>
            </div>
         )}
      </nav>
   );
};

export default Navbar;
