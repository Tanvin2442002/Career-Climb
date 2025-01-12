import Hasnat from "../../Assets/Hasnat.jpg";
import Skill from "../../Assets/skill.jpg";
import Zaima from "../../Assets/zaima.jpg";
import Navbar from "../Navbar";
import Pallob from "../../Assets/pallob.jpg"
import Ifrit from "../../Assets/ifrit.jpg";
import Nabiha from "../../Assets/nabuu.jpg"

import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";

const AboutUs = () => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.05,
    });

    const DevelopersInfo = [
        {
            id: 1,
            image: Hasnat,
            name: "Yusuf Reza Hasnat",
            role: ["Team Lead", "Frontend Developer", "Backend Developer"],
            linkedin: "https://www.linkedin.com/in/yusufrezahasnat",
            github: "https://github.com/hasnat0006",
            mail: "yusufrezahasant0006@gmail.com"
        },
        {
            id: 2,
            image: Zaima,
            name: "Zaima Ahmed",
            role: ["Frontend Developer", "Backend Developer", "UI/UX Designer"],
            linkedin: "https://www.linkedin.com/in/zaima-ahmed-287a4b276",
            github: "https://github.com/zaaaiiimaaa",
            mail: "zaimahmed101@gmail.com"
        },
        {
            id: 3,
            image: Pallob,
            name: "Tanvin Sarkar Pallob",
            role: ["Frontend Developer", "Backend Developer", "UI/UX Designer"],
            linkedin: "https://www.linkedin.com/in/md-tanvin-sarkar-pallab-033b84294/",
            github: "https://github.com/Tanvin2442002",
            mail: "tanvin.pallab2442002@gmail.com"
        },
        {
            id: 4,
            image: Ifrit,
            name: "Nazifa Zahin Ifrit",
            role: ["Frontend Developer", "Backend Developer"],
            linkedin: "https://www.linkedin.com/in/nazifa-zahin-ifrit-299a352bb/",
            github: "https://github.com/hasnat0006",
            mail: "zahin2296@gmail.com"
        },
        {
            id: 5,
            image: Nabiha,
            name: "Nabiha Parvez",
            role: ["Frontend Developer", "Backend Developer"],
            linkedin: "https://www.linkedin.com/in/nabiha-p-8a54b4217/",
            github: "https://github.com/hasnat0006",
            mail: "nabihaparvez11@gmail.com"
        },
    ]

    return (
        <div className="overflow-y-hidden">
            <Navbar />
            <div>
                <div className="md:flex justify-between items-center py-5 px-10 ">
                    <div className="-my-10 ">
                        <motion.p
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'backInOut' }}
                            className="text-md font-md text-start p-4 "
                        >
                            Finding the right job or internship can often feel like navigating a maze without a map. For many young professionals and students, the challenges include job-skill mismatches, a lack of personalized career guidance, and generic job suggestions that fail to align with their aspirations. This leads to wasted time, frustration, and missed opportunities.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: 'backInOut' }}
                            className="text-md font-md text-start p-4"
                        >
                            Our mission is to provide a comprehensive and user-friendly platform that caters to the diverse needs of job seekers and employers alike. We believe that everyone deserves the opportunity to find a fulfilling career that matches their skills and passions. By offering personalized recommendations and actionable insights, we aim to make the job search process more efficient and less stressful.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: 'backInOut' }}
                            className="text-md font-md text-start p-4"
                        >
                            At Career Climb, we understand these struggles and are committed to transforming the job search experience. By leveraging cutting-edge AI technology, we bridge the gap between skills and opportunities. Our platform empowers users to:
                        </motion.p>
                    </div>
                    <motion.img
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'backInOut' }}
                        src={Skill} alt="aboutus" className="object-cover h-96 rounded-3xl p-5"
                    />

                </div>
                <div className="px-10 -mt-10">
                    <p className="text-md font-md text-start p-4">
                        <ul className="list-disc pl-8">
                            <motion.li
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.5, ease: 'backInOut' }}
                            >
                                Receive tailored job and internship recommendations based on their unique skills and interests.
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.525, ease: 'backInOut' }}
                            >
                                Access a wealth of resources, including resume-building tools, interview preparation guides, and career advice articles.
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.55, ease: 'backInOut' }}
                            >
                                Connect with mentors and industry professionals for personalized guidance and support.
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.575, ease: 'backInOut' }}
                            >
                                Stay updated with the latest job market trends and insights to make informed career decisions.
                            </motion.li>
                        </ul>
                    </p>
                    <motion.p
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: 'backInOut' }}
                        className="text-md font-md text-start p-4"
                    >
                        We don’t stop there. With features like real-time application tracking, verified company reviews, and performance feedback, we ensure that every step of the journey is transparent, efficient, and empowering.
                        Whether you’re a recent graduate seeking your first role, a professional looking to transition careers, or an employer aiming to connect with top talent, Career Climb is here to make your journey seamless and rewarding. Together, we’re building a future where every individual can climb higher and achieve their career aspirations with confidence.
                    </motion.p>
                </div>
            </div>
            <div className="flex-col w-full justify-center items-center">
                <motion.h1
                    className="text-4xl font-bold uppercase text-green font-Bai_Jamjuree  text-center p-10"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 100 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'backInOut' }}
                        className="p-2"
                    >
                        Meet
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 100 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4, ease: 'backInOut' }}
                        className="p-2"
                    >
                        our
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 100 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5, ease: 'backInOut' }}
                        className="p-2"
                    >
                        developers
                    </motion.span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    ref={ref}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-wrap items-center justify-center"
                >
                    {DevelopersInfo.map((developer) => (
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, delay: developer.id * 0.2, ease: 'backInOut' }}
                            className="relative flex-col justify-items-center p-2 items-center shadow-gray-400 shadow-lg rounded-lg m-2 bg-[#bfd4e074]"
                        >
                            <motion.img
                                initial={{ opacity: 0, y: 100 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 1, delay: developer.id * 0.2, ease: 'backInOut' }}
                                src={developer.image} alt="developer" className="items-center h-36 rounded-full"
                            />
                            <div className="w-full">
                                <motion.h1
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 1, delay: developer.id * 0.2 + 0.1, ease: 'backInOut' }}
                                    className="text-xl font-semibold underline-offset-4 font-Poppins uppercase tracking-wide text-center mt-5">{developer.name}
                                </motion.h1>
                                <ul className="text-md font-md text-center p-1 text-wrap mb-6">{developer.role.map((role) => (
                                    <motion.li
                                        whileHover={{ scale: 1.025 }}
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 1, delay: developer.id * 0.2 + 0.2, ease: 'backInOut' }}
                                        className="border-2 rounded-lg m-2 bg-gray-200 hover:bg-gray-300 border-gray-400"
                                    >
                                        {role}
                                    </motion.li>
                                ))}
                                </ul>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 1, delay: developer.id * 0.2 + 0.3, ease: 'backInOut' }}
                                className="flex justify-evenly gap-2 absolute bottom-0 p-2"
                            >
                                <a href={"mailto:" + developer.mail} target="_blank" rel="noreferrer"
                                    className="text-center hover:scale-110 rounded-md transform transition duration-300 ease-in-out "

                                >
                                    <img src="https://img.shields.io/badge/Gmail-FF5722?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail badge"
                                        className="rounded-sm shadow-lg shadow-gray-300"
                                    />
                                </a>
                                <a href={developer.linkedin} target="_blank" rel="noreferrer"
                                    className="text-center hover:scale-110 rounded-md transform transition duration-300 ease-in-out"
                                >
                                    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=blue" alt="LinkedIn badge" className="rounded-sm" />
                                </a>
                                <a href={developer.github} target="_blank" rel="noreferrer"
                                    className="text-center hover:scale-110 rounded-md transform transition duration-300 ease-in-out"
                                >
                                    <img src="https://img.shields.io/badge/Github-333333?style=for-the-badge&logo=github&logoColor=white" alt="Github badge" className="rounded-sm" />
                                </a>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default AboutUs;