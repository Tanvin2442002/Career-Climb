import React from 'react';
import HeroImg from '../Assets/Hero.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const Hero = () => {

    return (
        <div className="flex flex-col justify-center items-center tracking-wider mt-5 gap-2 bg-gradient-to-b from-background to-green-opacity-30 p-5">
            <p className="text-3xl text-center font-Poppins font-normal ">Achieve your dream Career with</p>
            <p className="text-center text-4xl font-Poppins font-semibold tracking-wider text-green">CAREER CLIMB</p>
            <p className="text-center text-lg font-Poppins font-light tracking-normal">Your career is your responsibility. Take charge of it with clarity and purpose.</p>
            <div className="relative w-2/5 drop-shadow-lg">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input type="text" placeholder="Search for your dream job"
                    className="p-2 pl-10 rounded-full w-full" />
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 w-1/6     rounded-full">Search</button>
            </div>
            <img src={HeroImg} alt="Hero" className="w-3/4" />
            
        </div>
    )
}

export default Hero;