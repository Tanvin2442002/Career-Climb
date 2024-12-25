import React from "react";
import Kite from "../../Assets/Kite.svg"; // Update the path if different

const Footer = () => {
    return (
        <footer className="bg-black text-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-5">
                {/* Top Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-gray-700">
                    {/* Company Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-400">Jobs</a></li>
                            <li><a href="#" className="hover:text-gray-400">Categories</a></li>
                            <li><a href="#" className="hover:text-gray-400">Blogs</a></li>
                            <li><a href="#" className="hover:text-gray-400">Testimonials</a></li>
                        </ul>
                    </div>
                    {/* Help Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Help</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-400">Customer Support</a></li>
                            <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
                            <li><a href="#" className="hover:text-gray-400">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
                        </ul>
                    </div>
                    {/* Resources Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-400">Jobs</a></li>
                            <li><a href="#" className="hover:text-gray-400">Categories</a></li>
                            <li><a href="#" className="hover:text-gray-400">Blogs</a></li>
                            <li><a href="#" className="hover:text-gray-400">Testimonials</a></li>
                        </ul>
                    </div>
                    {/* Resources Section 2 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-400">Customer Support</a></li>
                            <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
                            <li><a href="#" className="hover:text-gray-400">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-10">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-lg font-bold tracking-wider">CAREER CLIMB</h1>
                    </div>
                    <p className="text-gray-400 text-sm text-center md:text-left mt-5 md:mt-0">
                        © Copyright 2024, All Rights Reserved by Career Climb
                    </p>
                    <div className="flex items-center space-x-5 mt-5 md:mt-0">
                        <img src={Kite} alt="Kite" className="w-6 h-6" />
                        <a href="#" className="hover:text-gray-400">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="hover:text-gray-400">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="hover:text-gray-400">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="hover:text-gray-400">
                            <i className="fab fa-pinterest"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
