import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Light from '../../Assets/Light.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

import Roadmap from '../Roadmap/Roadmap';


const CareerRoadMap = () => {

    const [currentRole, setCurrentRole] = useState("Fresher");
    const [targetRole, setTargetRole] = useState("Software Engineer");
    const [popVisible, setPopVisible] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
    }, [currentRole, targetRole]);


    const handleSrcDest = () => {
        const newCurrentRole = document.getElementById('currentRole').value;
        const newTargetRole = document.getElementById('targetRole').value;
        setCurrentRole(newCurrentRole);
        setTargetRole(newTargetRole);
    }

    return (
        <div>
            <Navbar />
            <div className='p-4 align-center flex flex-col justify-center items-center'>
                <img src={Light} alt='Light' className='absolute left-0 top-10 w-1/12' />
                <motion.h1
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'backInOut' }}
                    className='font-semibold text-3xl p-3'
                >
                    Career RoadMap
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'backInOut' }}
                    className='p-2'
                >
                    Explore potential roles and plan your growth step-by-step !
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'backInOut' }}
                    className='flex justify-center items-center p-4 w-2/3'
                >
                    <input type='text' placeholder='Your current role(Fresher)'
                        id='currentRole'
                        className='p-2 m-2 border-2 rounded-md w-full' />
                    <input type='text' placeholder='Your target role(Software Engineer)'
                        id='targetRole'
                        className='p-2 m-2 border-2 rounded-md w-full' />

                    {loading && (
                        <AnimatePresence>
                            <button
                                className="flex justify-center items-center space-x-2 px-3 py-1 bg-green rounded-md font-normal text-sm text-white shadow-lg transition-all w-7/12 h-10 duration-250 overflow-hidden group hover:shadow-xl hover:bg-green-700 opacity-50 cursor-not-allowed"
                                disabled
                            >
                                <motion.span
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                >
                                    Generating...
                                </motion.span>
                            </button>
                        </AnimatePresence>
                    )}

                    {!loading && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={handleSrcDest}
                            className="flex justify-center items-center space-x-2 px-3 py-1 bg-green rounded-md font-normal text-sm text-white shadow-lg transition-all w-7/12 h-10 duration-250 overflow-hidden group hover:shadow-xl hover:bg-green-700"
                        >
                            <span>Generate Roadmap</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </motion.button>
                    )}
                </motion.div>
            </div>
            <div>
                <Roadmap current={currentRole} destination={targetRole} setLoading={setLoading} />
            </div>
            {popVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

                </div>
            )}
        </div>
    );
};

export default CareerRoadMap;
