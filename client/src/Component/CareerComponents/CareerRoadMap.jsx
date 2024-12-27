import React, { useState } from 'react';
import Navbar from '../Navbar';
import Light from '../../Assets/Light.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Graph from './Graph';

const CareerRoadMap = () => {

    const [currentRole, setCurrentRole] = useState('');
    const [targetRole, setTargetRole] = useState('');


    return (
        <div>
            <Navbar />
            <div className='p-4 align-center flex flex-col justify-center items-center'>
                <img src={Light} alt='Light' className='absolute left-0 top-10 w-1/12' />
                <h1 className='font-semibold text-3xl p-3' >Career RoadMap</h1>
                <p className='p-2'>Explore potential roles and plan your growth step-by-step !</p>
                <div className='flex justify-center items-center p-4 w-2/3'>
                    <input type='text' placeholder='Your current role(Fresher)'
                        className='p-2 m-2 border-2 rounded-md w-full' />
                    <input type='text' placeholder='Your target role(Software Engineer)'
                        className='p-2 m-2 border-2 rounded-md w-full' />
                    <button
                        onClick={() => {
                            setCurrentRole(document.querySelector('input[placeholder="Your current role(Fresher)"]').value);
                            setTargetRole(document.querySelector('input[placeholder="Your target role(Software Engineer)"]').value);
                        }}
                        className="flex justify-center items-center space-x-2 px-3 py-1 bg-green rounded-md font-normal text-sm text-white shadow-lg transition-all w-80 h-10 duration-250 overflow-hidden group hover:shadow-xl hover:bg-green-700"
                    >
                        <span>View All Path!</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
            {/* // pass the currentRole and targetRole to the Graph component */}
            <Graph currentRole={currentRole} targetRole={targetRole} />
        </div>
    );
};

export default CareerRoadMap;
