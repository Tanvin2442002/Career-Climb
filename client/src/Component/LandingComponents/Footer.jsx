import React from "react";
import Kite from "../../Assets/Kite.svg"; // Update the path if different

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.25,
    });

    return (
        <footer className="bg-black text-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-5">
                {/* Top Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-gray-700">
                    {/* Company Section */}
                    <div>
                        <motion.h3
                            ref={ref}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="text-lg font-semibold mb-4">Company</motion.h3>
                        <motion.ul 
                            ref={ref}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="space-y-2">
                            <li><p className="hover:text-gray-400">Jobs</p></li>
                            <li><p className="hover:text-gray-400">Categories</p></li>
                            <li><p className="hover:text-gray-400">Blogs</p></li>
                            <li><p className="hover:text-gray-400">Testimonials</p></li>
                        </motion.ul>
                    </div>
                    {/* Help Section */}
                    <div>
                        <motion.h3
                            ref={ref}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="text-lg font-semibold mb-4">Help</motion.h3>
                        <motion.ul 
                            ref={ref}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="space-y-2">
                            <li><p className="hover:text-gray-400">Customer Support</p></li>
                            <li><p className="hover:text-gray-400">Contact Us</p></li>
                            <li><p className="hover:text-gray-400">Terms & Conditions</p></li>
                            <li><p className="hover:text-gray-400">Privacy Policy</p></li>
                        </motion.ul>
                    </div>
                    {/* Resources Section */}
                    <div>
                        <motion.h3
                            ref={ref}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="text-lg font-semibold mb-4">Resources</motion.h3>
                        <motion.ul 
                            ref={ref}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="space-y-2">
                            <li><p className="hover:text-gray-400">Jobs</p></li>
                            <li><p className="hover:text-gray-400">Categories</p></li>
                            <li><p className="hover:text-gray-400">Blogs</p></li>
                            <li><p className="hover:text-gray-400">Testimonials</p></li>
                        </motion.ul>
                    </div>
                    {/* Resources Section 2 */}
                    <div>
                        <motion.h3
                            ref={ref}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="text-lg font-semibold mb-4">Resources</motion.h3>
                        <motion.ul 
                            ref={ref}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="space-y-2">
                            <li><p className="hover:text-gray-400">Customer Support</p></li>
                            <li><p className="hover:text-gray-400">Contact Us</p></li>
                            <li><p className="hover:text-gray-400">Terms & Conditions</p></li>
                            <li><p className="hover:text-gray-400">Privacy Policy</p></li>
                        </motion.ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <motion.div 
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex flex-col md:flex-row justify-between items-center mt-10">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-lg font-bold tracking-wider">CAREER CLIMB</h1>
                    </div>
                    <p className="text-gray-400 text-sm text-center md:text-left mt-5 md:mt-0">
                        © Copyright 2024, All Rights Reserved by Career Climb
                    </p>
                    <div className="flex items-center space-x-5 mt-5 md:mt-0">
                        <img src={Kite} alt="Kite" className="w-6 h-6" />
                        <p className="hover:text-gray-400">
                            <i className="fab fa-facebook"></i>
                        </p>
                        <p className="hover:text-gray-400">
                            <i className="fab fa-twitter"></i>
                        </p>
                        <p className="hover:text-gray-400">
                            <i className="fab fa-instagram"></i>
                        </p>
                        <p className="hover:text-gray-400">
                            <i className="fab fa-pinterest"></i>
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
