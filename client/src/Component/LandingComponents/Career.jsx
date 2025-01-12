import Question from '../../Assets/Questions.svg'

import Achive from '../../Assets/Achive.svg'
import Gap from '../../Assets/Gap.svg'
import MagnifyingGlass from '../../Assets/MagnifyingGlass.svg'
import NextRole from '../../Assets/NextRole.svg'
import Path from '../../Assets/Path.svg'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Career = () => {
    const navigate = useNavigate();
    const { ref: imgRef, inView: imgInView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const { ref: textRef, inView: textInView } = useInView({
        triggerOnce: true,
        threshold: 0.01,
    });


    const Steps = [
        {
            id: 1,
            title: 'Where Are You Now?',
            icon: MagnifyingGlass,
        },
        {
            id: 2,
            title: 'Explore Career Paths',
            icon: Path,
        },
        {
            id: 3,
            title: 'Bridge the Gap',
            icon: Gap,
        },
        {
            id: 4,
            title: 'Plan Your Next Steps',
            icon: NextRole,
        },
        {
            id: 5,
            title: 'Achieve Your Dream Role!',
            icon: Achive,
        },
    ];

    return (
        <motion.div 
            className='flex flex-col md:flex-row-reverse justify-center items-center tracking-wider mt-5 gap-2 bg-gradient-to-b from-background to-green-opacity-30 p-5 overflow-y-hidden'>
            <motion.img src={Question} alt="Question" 
                ref={imgRef}
                initial={{ opacity: 0, x: 50 }}
                animate={imgInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0, ease: 'easeInOut' }}
                className="w-1/3" 
            />
            <div className='relative flex-col w-full justify-evenly items-center gap-5 p-5'>
                <div className='text-center font-Bai_Jamjuree w-full flex-col justify-evenly items-center gap-5 p-5'>
                    <motion.div
                        ref={imgRef}
                        initial={{ opacity: 0, x: -50 }}
                        animate={imgInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1, ease: 'easeInOut' }}

                    >
                        <h1 className='text-3xl font-semibold p-2'>Confused about your career?</h1>
                        <h1 className='text-4xl font-bold p-2 text-green'>We’ve Got You Covered!</h1>
                    </motion.div>
                    <motion.p 
                        ref={imgRef}
                        initial={{ opacity: 0, x: -50 }}
                        animate={textInView? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
                        className='text-lg font-light font-Poppins p-2 tracking-normal w-full text-start'>
                        Feeling stuck or unsure about your next step in the tech industry? Our platform is designed to guide you. Whether you're starting out or looking to grow, we offer personalized roadmaps tailored to your skills, experience, and career goals.
                    </motion.p>
                    <motion.div
                        ref={imgRef}
                        initial={{ opacity: 0, x: -50 }}
                        animate={textInView? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}
                        className='relative flex flex-col flex-start z-0 ml-0 md:ml-5'>
                        <div className="absolute top-0 left-2.5 h-full w-0.5 bg-gradient-to-b from-transparent via-[#0C098C] to-transparent bg-dash"></div>
                        {Steps.map(step => (
                            <div key={step.id} className='flex w-full gap-5 z-10'>
                                <img src={step.icon
                                } alt="MagnifyingGlass" className="w-6" />
                                <h1 className='text-l font-semibold p-2 tracking-wider'>{step.title}</h1>
                            </div>
                        ))}
                    </motion.div>
                </div>
                <motion.button
                    ref={textRef}
                    initial={{ opacity: 0, x: -50 }}
                    animate={textInView? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}
                    onClick={() => navigate('/login')}
                    className="relative ml-5 flex justify-center items-center space-x-2 px-3 py-1 bg-green rounded-md font-normal text-sm text-white shadow-lg transition-all duration-250 overflow-hidden group hover:shadow-xl hover:bg-green-700"
                >
                    <span>Explore Now!</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </motion.button>
            </div>
        </motion.div>
    );
}

export default Career;