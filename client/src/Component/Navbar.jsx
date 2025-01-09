
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBars, faTimes, faBell, faUser,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import ProfileImage from '../Assets/Hasnat.jpg';

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();
   const getCurrentUrl = () => {
      return window.location.href;
   };

   const [isUser, setIsUser] = useState(false);
   const [isEmployer, setIsEmployer] = useState(false);
   const [profileClicked, setProfileClicked] = useState(false);

   useEffect(() => {
      const url = getCurrentUrl();
      console.log(`Current URL: ${url}`);
      if (url.includes('/emp')) {
         setIsEmployer(true);
      } else if (url !== "http://localhost:3000/") {
         setIsUser(true);
      }

      console.log(`isUser: ${isUser}`);
      console.log(`isEmployer: ${isEmployer}`);

   }, [isUser, isEmployer]);


   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   const handleSignUp = () => {
      navigate('/signup');
   };

   const handleLogin = () => {
      navigate('/login');
   }

   const NavItemAll = ["Home", "Jobs/Internship", "Roadmap", "Skill Gap Analysis"];
   const NavItemUser = ["Dashboard", "Jobs/Internship", "Roadmap", "Skill Gap Analysis", "Applications"];
   const NavItemEmployer = ["Dashboard", "Recent Post", "Applicants"];

   return (
      <nav className="flex font-Poppins justify-between items-center w-full h-16 px-6 bg-white bg-opacity-10 backdrop-blur-md shadow-md sticky top-0 z-50">
         <h1 className="text-xl font-semibold tracking-wider w-auto">CAREER CLIMB</h1>
         <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black text-xl">
               <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
         </div>
         <ul
            className={`${isOpen ? "flex" : "hidden"
               } absolute top-16 ${isOpen ? "right-0 w-1/2" : ""} bg-background bg-opacity-95 md:bg-transparent md:static md:flex md:flex-row flex-col md:items-center md:space-x-5 shadow-md md:shadow-none transition-all duration-300`}
         >
            {/* <li className="px-2 py-3 md:py-2 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium">
               Home
            </li>
            <li className="px-2 py-3 md:py-2 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium">
               Jobs/Internship
            </li>
            <li className="px-2 py-3 md:py-2 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium">
               Roadmap
            </li>
            <li className="px-2 py-3 md:py-2 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium">
               Skill Gap Analysis
            </li> */}
            {isUser && NavItemUser.map((item, index) => (
               <li key={index} className="px-2 py-3 md:py-2 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium">
                  {item}
               </li>
            ))}

            {isEmployer && NavItemEmployer.map((item, index) => (
               <li key={index} className="px-2 py-3 md:py-2 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium">
                  {item}
               </li>
            ))}
            {!isUser && !isEmployer && NavItemAll.map((item, index) => (
               <li key={index} className="px-2 py-3 md:py-2 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium">
                  {item}
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
            {(isUser || isEmployer) && (
               <div className='flex-col space-x-5 md:hidden'>
                  <li className="px-2 py-3 md:py-2 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium">
                     Notifications
                  </li>
                  <div className='flex items-center'>
                     <img src={ProfileImage} alt="Profile" className="h-10 w-10 rounded-full" />
                     <li className="px-2 py-3 md:py-2 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium">
                        View Profile
                     </li>
                  </div>
                  <button className="flex items-start justify-center justify-items-center hover:scale-105 my-2">
                     <FontAwesomeIcon icon={faRightFromBracket} className='p-1'/>
                     <li className="px-2 md:py-2 cursor-pointer hover:border-b-2 hover:border-y-zinc-950 hover:font-medium">
                        Logout
                     </li>
                  </button>
               </div>
               
            )}
         </ul>

         {/* Desktop View Buttons */}
         {!isUser && !isEmployer && (
            <div className="hidden md:flex md:items-center md:space-x-5">
               <button className="flex justify-center items-center space-x-2 px-3 py-1 bg-black rounded-md font-normal text-sm text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-white hover:text-black"
                  onClick={handleLogin}
               >
                  <span>Log In</span>
                  <FontAwesomeIcon icon={faArrowRight} />
               </button>
               <button className="flex justify-center items-center space-x-2 px-3 py-1 bg-black rounded-md font-normal text-sm text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-white hover:text-black"
                  onClick={handleSignUp}
               >
                  <span>Sign Up</span>
                  <FontAwesomeIcon icon={faArrowRight} />
               </button>
            </div>
         )}

         {(isUser || isEmployer) && (
            <div className='hidden md:flex md:space-x-5'>
               <button className="text-black text-2xl">
                  <FontAwesomeIcon icon={faBell} />
               </button>
               <button 
                  className="text-black text-xl space-x-2 flex items-center justify-between"
                  onClick={() => setProfileClicked(!profileClicked)}
               >
                  <img src={ProfileImage} alt="Profile" className="h-10 w-10 rounded-full" />
               </button>
            </div>
         )}

         {profileClicked && (
            <div className="absolute top-16 right-0 bg-green-opacity-50 bg-opacity-95 shadow-xl rounded-md w-48 h-28 p-2 flex-col items-start justify-between">
               <h1 className='text-center border-b-2 border-gray-700 font-semibold'>Yusuf Reza Hasnat</h1>
               <ul className='flex flex-col items-start justify-start mt-2'>
                  <button className="ml-4 hover:scale-105">
                     <FontAwesomeIcon icon={faUser}/>
                     <span className="text-lg font-normal px-2 hover:underline">View Profile</span>
                  </button>
                  <button className="ml-4 hover:scale-105">
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
