import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import HeroImg from '../../Assets/Hero.svg';
import Kite from '../../Assets/Kite.svg';
import Light from '../../Assets/Light.svg';

const Hero = () => {

    return (
        <div className="flex flex-col justify-center items-center tracking-wider mt-5 gap-2 bg-gradient-to-b from-background to-green-opacity-30 p-5">
            <div className='relative text-center w-full flex justify-evenly items-center gap-5 p-5'>
                <div>
                    <p className="text-3xl font-normal p-2">Achieve your dream Career with</p>
                    <p className="text-4xl font-semibold p-2 tracking-wider text-green">CAREER CLIMB</p>
                    <p className="text-lg font-light p-2 tracking-normal">Your career is your responsibility. Take charge of it with clarity and purpose.</p>
                </div>
                <img src={Light} alt="Light" className="absolute w-1/12 left-10 md:w-1/8" />
                <img src={Kite} alt="Kite" className="absolute w-1/12 right-10 md:w-1/8" />
            </div>
            <div className="relative drop-shadow-lg lg:w-1/3">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input type="text" placeholder="Search for your dream job"
                    className="p-2 pl-10 rounded-full w-full" />
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300 text-sm sm:text-base">
                    Search
                </button>
            </div>
            <img src={HeroImg} alt="Hero" className="w-3/4" />
        </div>
    )
}

export default Hero;