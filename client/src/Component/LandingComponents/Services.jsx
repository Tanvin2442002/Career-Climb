import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faRoute, faMagnifyingGlassChart, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const servicesData = [
    {
        id: 1,
        title: 'Roadmap',
        description: 'Visualize your career journey with detailed role progressions and skill requirements.',
        icon: faRoute
    },
    {
        id: 2,
        title: 'Skill Gap Analysis',
        description: 'Identify missing skills and receive actionable recommendations to improve.',
        icon: faMagnifyingGlassChart
    },
    {
        id: 3,
        title: 'Job/Inter. offer',
        description: 'Explore tailored job and internship opportunities to grow your career.',
        icon: faMagnifyingGlassPlus
    },
    {
        id: 4,
        title: 'Hiring',
        description: 'Discover qualified candidates with the right skills for your team’s success.',
        icon: faMagnifyingGlassChart
    }
];

const ServiceItem = ({ service }) => {
    const navigate = useNavigate();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.4,
    });

    return (
        <motion.div
            key={service.id}
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="flex flex-col w-full justify-between items-center gap-3 p-5 bg-green-opacity-10 shadow-greenish rounded-lg"
        >
            <FontAwesomeIcon icon={service.icon} alt={service.title} className="h-10 w-10 top-0 text-green-opacity-80" />
            <h2 className="text-xl font-semibold w-full text-green-700 text-center border-t-2 border-green-opacity-50">{service.title}</h2>
            <p className="text-sm text-center">{service.description}</p>
            <button 
                onClick={() => navigate('/login')}
            className="flex justify-center items-center space-x-2 px-3 py-1 bg-green rounded-md font-normal text-sm text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-green-700">
                <span>Explore Now!</span>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </motion.div>
    );
};

const Services = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.4,
    });
    return (
        <div className='overflow-y-hidden'>
            <div className="flex flex-col items-center">
                <motion.h1 
                    ref={ref}
                    initial={{ opacity: 0, y: 100 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="text-3xl font-semibold text-center font-Bai Jamjuree mt-10"
                >
                    Our Services
                </motion.h1>
                <div className="grid grid-cols-2 xl:grid-cols-4 xl:w-5/6 gap-4 p-5">
                    {servicesData.map(service => (
                        <ServiceItem key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;