import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Light from '../../Assets/Light.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../../UI/Loader';
import Roadmap from '../Roadmap/Roadmap';
import Google from '../../Assets/google.svg';
import Youtube from '../../Assets/youtube.png';


const CareerRoadMap = () => {
    const [currentRole, setCurrentRole] = useState("Fresher");
    const [targetRole, setTargetRole] = useState("Software Engineer");
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({});



    const [thinking, setThinking] = useState(false);
    const [introduction, setIntroduction] = useState({});
    const [importance, setImportance] = useState({});
    const [application, setApplication] = useState([]);
    const [resources, setResources] = useState([]);
    const [nextSteps, setNextSteps] = useState([]);
    const [googleLink, setGoogleLink] = useState("https://www.google.com/");
    const [youtubeLink, setYoutubeLink] = useState("https://www.youtube.com/");

    useEffect(() => {

    }, [currentRole, targetRole, info]);

    const handleSrcDest = () => {
        const newCurrentRole = document.getElementById('currentRole').value;
        const newTargetRole = document.getElementById('targetRole').value;
        setCurrentRole(newCurrentRole);
        setTargetRole(newTargetRole);
        setLoading(true);
    }

    const fetchDetails = async (current, destination, role) => {
        try {
            const response = await fetch(`http://localhost:5000/roadmap/details?from=${current}&to=${destination}&details=${role}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data.response || [];
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        async function fetchData() {
            if (!info.details) {
                return;
            }
            setGoogleLink(`https://www.google.com/search?q=${info.details.trim().split(' ').join('%20')}%20for%20${info.destination.trim().split(' ').join('%20')}`);
            setYoutubeLink(`https://www.youtube.com/results?search_query=${info.details.trim().split(' ').join('+')}+for+${info.destination.trim().split(' ').join('+')}`);

            setThinking(true);
            setImportance({});
            setIntroduction({});
            setApplication([]);
            setResources([]);
            setNextSteps([]);
            const details = await fetchDetails(info.current, info.destination, info.details);
            details.forEach((info, index) => {
                if (info.introduction) {
                    setIntroduction(info.introduction);
                }
                if (info.importance) {
                    setImportance(info.importance);
                }
                if (info.resources) {
                    setResources(info.resources);
                }
                if (info.application) {
                    setApplication(info.application);
                }
                if (info.nextSteps) {
                    setNextSteps(info.nextSteps);
                }
            });
            setThinking(false);
        }
        fetchData();
    }, [info]);


    return (
        <div>
            <Navbar />
            <div className={`${sidebarVisible ? 'filter blur-sm' : ''}`}>
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
                        Explore potential roles and plan your growth step-by-step!
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'backInOut' }}
                        className='flex justify-center items-center p-4 w-2/3'
                    >
                        <input
                            type='text'
                            placeholder='Your current role(Fresher)'
                            id='currentRole'
                            className='p-2 m-2 border-2 rounded-md w-full'
                        />
                        <input
                            type='text'
                            placeholder='Your target role(Software Engineer)'
                            id='targetRole'
                            className='p-2 m-2 border-2 rounded-md w-full'
                        />

                        {loading && (
                            <AnimatePresence>
                                <button
                                    className="flex justify-center items-center space-x-2 px-3 py-1 bg-green rounded-md font-normal text-sm text-white shadow-lg transition-all w-7/12 h-10 duration-250 overflow-hidden group hover:shadow-xl hover:bg-green-700 opacity-50 cursor-not-allowed animate-pulse"
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
                    <Roadmap
                        current={currentRole}
                        destination={targetRole}
                        setSidebarVisible={setSidebarVisible}
                        setInfo={setInfo}
                        setLoading={setLoading}
                        load = {loading}
                    />
                </div>
            </div>
            {sidebarVisible && (
                <div className="flex fixed right-0 top-16 w-full min-h-[95vh] justify-center items-center">
                    {thinking && <Loader message="Thinking..." />}
                    {!thinking && (
                        <div className="p-4 absolute overflow-y-auto max-h-[92vh] right-0 top-0 bg-gray-100 rounded-lg w-5/12 shadow-lg">
                            <h3 className="text-2xl font-bold text-green uppercase text-center font-Bai_Jamjuree underline tracking-wider p-2">DETAILS</h3>
                            <div className="p-2">
                                <h3 className="text-xl font-bold uppercase font-Bai_Jamjuree underline tracking py-2">{introduction.title}:</h3>
                                <p>{introduction.description}</p>
                            </div>
                            <div className="p-2">
                                <h3 className="text-xl font-bold uppercase font-Bai_Jamjuree underline tracking py-2">{importance.title}:</h3>
                                <p>{importance.description}</p>
                            </div>
                            <div className="p-2">
                                <h3 className="text-xl font-bold uppercase font-Bai_Jamjuree underline tracking py-2">Resources:</h3>
                                {resources.map((resource, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-l">{resource.title}: <span className="font-normal">{resource.description}</span></p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2">
                                <h3 className="text-xl font-bold uppercase font-Bai_Jamjuree underline tracking py-2">Application:</h3>
                                {application.map((app, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-l">{app.title}: <span className="font-normal">{app.description}</span></p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2">
                                <h3 className="text-xl font-bold uppercase font-Bai_Jamjuree underline tracking py-2">Next Steps:</h3>
                                {nextSteps.map((step, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-l">{step.concept}: <span className="font-normal">{step.description}</span></p>
                                    </div>
                                ))}
                            </div>
                            <div className='border-t-2 border-gray-500 p-2'>
                                <p>Find more resources using these pre-filled search queries:</p>
                                <div className='p-2 flex flex-row justify-center items-center space-x-2 h-12'>
                                    <a
                                        href={googleLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='flex justify-center items-center space-x-2 border-2 p-1 rounded-md hover:shadow-md hover:bg-gray-200 cursor-pointer'>
                                        <img src={Google} alt='Light' className='h-6 w-6' />
                                        <p>Google</p>
                                    </a>
                                    <a
                                        href={youtubeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='flex justify-center items-center space-x-2 border-2 p-1 rounded-md hover:shadow-md hover:bg-gray-200 cursor-pointer'>
                                        <img src={Youtube} alt='Light' className='h-6 w-6' />
                                        <p>Youtube</p>
                                    </a>

                                </div>
                            </div>
                        </div>
                    )}
                    <FontAwesomeIcon icon={faXmark} color="red" className="text-2xl absolute top-0 right-2 cursor-pointer" onClick={() => setSidebarVisible(false)} />
                </div>
            )}
        </div>
    );
};

export default CareerRoadMap;
