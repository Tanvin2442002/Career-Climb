import React, { useState } from "react";
import Navbar from "./Navbar";
import MIST from '../Assets/mist.jpeg';
import cpp from '../Assets/cpp.jpeg';
import java from '../Assets/java.webp';
import html from '../Assets/html.webp';
import user from '../Assets/user.png';
import savar from '../Assets/savar.jpeg';

const Myprofile = () => {
    const [rating, setRating] = useState(3); // Default rating

    // Function to handle hover and rating change
    const handleHover = (index) => {
        setRating(index);
    };

    const handleClick = (index) => {
        setRating(index); // Set rating permanently on click
    };

    return (
        <div className="myprofile-container flex flex-col font-sans bg-white">
            <Navbar />
            <div className="profile-content flex flex-col lg:flex-row w-full p-5">
                <div className="left-panel flex flex-col w-full lg:w-2/3 mr-5 gap-5">
                    {/* Education Section */}
                    <section className="education">
                        <h3 className="text-xl font-semibold mb-4">Education</h3>
                        <div className="education-item-container flex items-center p-4 mb-4 border border-gray-300 rounded-xl bg-gray-50 relative">
                            <div className="education-item flex items-center gap-4">
                                <img src={MIST} alt="MIST Logo" className="education-logo w-12 h-12" />
                                <div className="education-details flex-1">
                                    <h3 className="font-semibold text-lg">Military Institute of Science and Technology (MIST)</h3>
                                    <p>Bachelor of Science – BS, Computer Science and Engineering</p>
                                    <p>2022–2026</p>
                                </div>
                            </div>
                            <button className="edit-item-button absolute right-2 bottom-2 p-2 bg-green-700 text-white rounded-md text-sm hover:bg-blue-500">
                                Edit
                            </button>
                        </div>

                        <div className="education-item-container flex items-center p-4 mb-4 border border-gray-300 rounded-xl bg-gray-50 relative">
                            <div className="education-item flex items-center gap-4">
                                <img src={savar} alt="Savar College Logo" className="education-logo w-12 h-12" />
                                <div className="education-details flex-1">
                                    <h3 className="font-semibold text-lg">Savar Cantonment Public School & College</h3>
                                    <p>Higher Secondary School Certificate</p>
                                    <p>2019–2021</p>
                                </div>
                            </div>
                            <button className="edit-item-button absolute right-2 bottom-2 p-2 bg-green-700 text-white rounded-md text-sm hover:bg-blue-500">
                                Edit
                            </button>
                        </div>

                        <div className="education-item-container flex items-center p-4 mb-4 border border-gray-300 rounded-xl bg-gray-50 relative">
                            <div className="education-item flex items-center gap-4">
                                <img src="/assets/zirabo_logo.png" alt="Zirabo School Logo" className="education-logo w-15 h-15 rounded-full object-cover" />
                                <div className="education-details flex-1">
                                    <h3 className="font-semibold text-lg">Zirabo Cantonment Public School & College</h3>
                                    <p>Secondary School Certificate</p>
                                    <p>2017–2018</p>
                                </div>
                            </div>
                            <button className="edit-item-button absolute right-2 bottom-2 p-2 bg-green-700 text-white rounded-md text-sm hover:bg-blue-500">
                                Edit
                            </button>
                        </div>

                        <div className="add-more-container flex justify-left mt-4">
                            <button className="add-more-button p-2 bg-green-700 text-white rounded-md text-lg cursor-pointer hover:bg-green-600">
                                Add More +
                            </button>
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section className="skills mt-10">
                        <h3 className="text-xl font-semibold mb-4">Skills</h3>
                        <div className="education-item-container flex items-center p-4 mb-4 border border-gray-300 rounded-xl bg-gray-50 relative">
                            <div className="education-item flex items-center gap-4">
                                <img src={java} alt="Java" className="education-logo w-12 h-12" />
                                <div className="education-details flex-1">
                                    <h3 className="font-semibold text-lg">Java</h3>
                                    <p>Programming Language</p>
                                </div>
                            </div>
                            <button className="edit-item-button absolute right-2 bottom-2 p-2 bg-green-700 text-white rounded-md text-sm hover:bg-blue-500">
                                Edit
                            </button>
                        </div>

                        <div className="education-item-container flex items-center p-4 mb-4 border border-gray-300 rounded-xl bg-gray-50 relative">
                            <div className="education-item flex items-center gap-4">
                                <img src={html} alt="HTML" className="education-logo w-12 h-12 rounded-full object-cover" />
                                <div className="education-details flex-1">
                                    <h3 className="font-semibold text-lg">HTML</h3>
                                    <p>Markup Language</p>
                                </div>
                            </div>
                            <button className="edit-item-button absolute right-2 bottom-2 p-2 bg-green-700 text-white rounded-md text-sm hover:bg-blue-500">
                                Edit
                            </button>
                        </div>

                        <div className="education-item-container flex items-center p-4 mb-4 border border-gray-300 rounded-xl bg-gray-50 relative">
                            <div className="education-item flex items-center gap-4">
                                <img src={cpp} alt="C++" className="education-logo w-12 h-12 rounded-full object-cover" />
                                <div className="education-details flex-1">
                                    <h3 className="font-semibold text-lg">C++</h3>
                                    <p>Programming Language</p>
                                </div>
                            </div>
                            <button className="edit-item-button absolute right-2 bottom-2 p-2 bg-green-700 text-white rounded-md text-sm hover:bg-blue-500">
                                Edit
                            </button>
                        </div>
                        <div className="add-more-container flex justify-left mt-4">
                            <button className="add-more-button p-2 bg-green-700 text-white rounded-md text-lg cursor-pointer hover:bg-green-600">
                                Add More +
                            </button>
                        </div>
                    </section>

                    {/* Past Experience Section */}
                    <section className="experience mt-10">
                        <h3 className="text-xl font-semibold mb-4">Past Experience</h3>
                        <div className="experience-item-container flex items-center p-4 mb-4 border border-gray-300 rounded-xl bg-gray-50 relative">
                            <div className="experience-item flex items-center gap-4">
                                <img src="/assets/mist_computer_club_logo.png" alt="MIST Computer Club Logo" className="experience-logo w-15 h-15 rounded-full object-cover" />
                                <div className="experience-details flex-1">
                                    <h3 className="font-semibold text-lg">MIST Computer Club</h3>
                                    <p>Assistant Secretary</p>
                                    <p>Feb 2024 – Present</p>
                                </div>
                            </div>
                            <button className="edit-item-button absolute right-2 bottom-2 p-2 bg-green-700 text-white rounded-md text-sm hover:bg-blue-500">
                                Edit
                            </button>
                        </div>

                        <div className="experience-item-container flex items-center p-4 mb-4 border border-gray-300 rounded-xl bg-gray-50 relative">
                            <div className="experience-item flex items-center gap-4">
                                <img src="/assets/mist_computer_club_logo.png" alt="MIST Computer Club Logo" className="experience-logo w-15 h-15 rounded-full object-cover" />
                                <div className="experience-details flex-1">
                                    <h3 className="font-semibold text-lg">MIST Computer Club</h3>
                                    <p>Instructor</p>
                                    <p>Feb 2023 – Present</p>
                                </div>
                            </div>
                            <button className="edit-item-button absolute right-2 bottom-2 p-2 bg-green-700 text-white rounded-md text-sm hover:bg-blue-500">
                                Edit
                            </button>
                        </div>

                        <div className="add-more-container flex justify-left mt-4">
                            <button className="add-more-button p-2 bg-green-700 text-white rounded-md text-lg cursor-pointer hover:bg-green-600">
                                Add More +
                            </button>
                        </div>
                    </section>
                </div>

                {/* Right Panel */}
                <div className="right-panel order-first lg:order-none lg:w-1/3 lg:sticky lg:top-24 z-10 p-5 bg-green-50 rounded-xl shadow-lg h-[85vh] box-border">
                    <div className="profile-info text-center flex flex-col items-center justify-center">
                        <img src={user} alt="Profile" className="profile-picture w-20 h-20 rounded-full mb-2" />
                        <h3 className="font-semibold text-lg">ZAIMA AHMED</h3>
                        <p>zaimahmed101@gmail.com</p>
                        {/* Dynamic Star Rating */}
                        <div className="stars mt-2">
                            {[...Array(5)].map((_, index) => (
                                <span
                                    key={index}
                                    onMouseEnter={() => handleHover(index + 1)}
                                    onMouseLeave={() => handleHover(rating)}
                                    onClick={() => handleClick(index + 1)}
                                    className={`cursor-pointer text-2xl ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <p>01735654761</p>
                        <p>Dhaka, Bangladesh</p>
                        <p>Occupation: Student</p>
                    </div>
                    <div className="bio mt-6">
                        <h3 className="text-lg font-semibold mb-2">BIO</h3>
                        <textarea
                            className="bio-textarea w-full h-32 border-0 rounded-md p-2 bg-gray-50"
                            readOnly
                            placeholder="Your biography goes here..."
                        ></textarea>
                    </div>
                    <div className="actions mt-6">
                        <button className="edit-button w-full mb-2 p-2 border-0 rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-400">
                            Edit Profile
                        </button>
                        <button className="view-button w-full mb-2 p-2 border-0 rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-400">
                            View Your CV
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Myprofile;
