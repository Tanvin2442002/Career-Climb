import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { motion, useAnimation, useInView } from "framer-motion";

import landing2 from '../../Assets/landing2.png';
import HeroImg from '../../Assets/Hero.svg';
import Kite from '../../Assets/Kite.svg';
import Light from '../../Assets/Light.svg';

const Hero = () => {
    
    return (
        <div className="flex flex-col justify-center items-center tracking-wider mt-5 gap-2 bg-background p-5 overflow-y-hidden">
            <div className='relative text-center w-full flex justify-evenly items-center gap-5 p-5'>
                <div>
                    <motion.p 
                        className="text-3xl font-normal p-2"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}

                    >Achieve your dream Career with</motion.p>
                    <motion.p 
                        className="text-4xl font-semibold p-2 tracking-wider text-green"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}   
                        >CAREER CLIMB
                    </motion.p>
                    <motion.p
                        className="text-lg font-light p-2 tracking-normal"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
                    >
                        Your career is your responsibility. Take charge of it with clarity and purpose.
                    </motion.p>
                </div>
                <motion.img src={Light} alt="Light" 
                    className="absolute w-1/12 left-10 md:w-1/8" 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
                />
                <motion.img src={Kite} alt="Kite" 
                    className="absolute w-1/12 right-10 md:w-1/8" 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}

                />
            </div>
            <motion.div 
                className="relative drop-shadow-lg lg:w-1/3"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input type="text" placeholder="Search for your dream job"
                    className="p-2 pl-10 rounded-full w-full" />
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300 text-sm sm:text-base">
                    Search
                </button>
            </motion.div>
            <motion.img src={landing2} alt="Hero" 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
                className="w-3/4" 
            />
        </div>
    )
}

export default Hero;