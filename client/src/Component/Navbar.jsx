
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBars, faTimes, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();
   const getCurrentUrl = () => {
      return window.location.href;
   };

   const [isUser, setIsUser] = useState(false);
   const [isEmployer, setIsEmployer] = useState(false);

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
               <div className='flex space-x-5 md:hidden'>
                  <button className="text-black text-2xl">
                     <FontAwesomeIcon icon={faBell} />
                  </button>
                  <button className="text-black text-xl space-x-2 flex items-center justify-between">
                     <FontAwesomeIcon icon={faUser} />
                     <span className="hidden md:inline text-base mt-2">Zaima</span>
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
               <button className="text-black text-xl space-x-2 flex items-center justify-between">
                  <FontAwesomeIcon icon={faUser} />
                  <span className="hidden md:inline text-base mt-2">Zaima</span>
               </button>
            </div>
         )}
      </nav>
   );
};

export default Navbar;
