import React, { useState } from "react";
import Navbar from "./Navbar";
import MIST from '../Assets/mist.jpeg';
import user from '../Assets/user.png';
import savar from '../Assets/savar.jpeg';
import MCC from '../Assets/MCC.png';


const Educations = [
    {
        id: 1,
        logo: MIST,
        institution: "Military Institute of Science and Technology (MIST)",
        degree: "Bachelor of Science – BS, Computer Science and Engineering",
        duration: "2022–2026",
    },
    {
        id: 2,
        logo: savar,
        institution: "Savar Cantonment Public School & College",
        degree: "Higher Secondary School Certificate",
        duration: "2019–2021",
    },
    {
        id: 3,
        logo: savar,
        institution: "Savar Cantonment Public School & College",
        degree: "Secondary School Certificate",
        duration: "2017–2018",
    },
]

const Skills = [
    // add c, cpp, java, python, react, nodejs, css, tailwind, supabase, render, git, oracle
    { id: 1, logo: "c" },
    { id: 2, logo: "cpp" },
    { id: 3, logo: "java" },
    { id: 4, logo: "python" },
    { id: 5, logo: "react" },
    { id: 6, logo: "nodejs" },
    { id: 7, logo: "css" },
    { id: 8, logo: "tailwind" },
    { id: 9, logo: "supabase" },
    { id: 10, logo: "vercel" },
    { id: 11, logo: "git" },
    { id: 12, logo: "html" },
]

const Experiences = [
    { id: 1, logo: MCC, organization: "MIST Computer Club", position: "Assistant Secretary", duration: "Feb 2024 – Present" },
    { id: 2, logo: MCC, organization: "MIST Computer Club", position: "Instructor", duration: "Feb 2023 – Present" },
]


const Myprofile = () => {
    const [rating, setRating] = useState(3);

    const handleHover = (index) => {
        setRating(index);
    };

    const handleClick = (index) => {
        setRating(index);
    };

    return (
        <div className="flex flex-col font-Poppins bg-white">
            <Navbar />
            <div className="flex flex-col lg:flex-row w-full p-5">
                <div className="flex flex-col w-full lg:w-2/3 mr-5 gap-5">
                    {/* Education Section */}
                    <section>
                        <h3 className="text-xl font-semibold mb-3">Education</h3>
                        <div className="rounded-xl p-3">
                            {Educations.map((education) => (
                                <div className="education-item-container flex items-center bg-gray-100 border-2 border-gray-300 rounded-lg p-3 mb-4">
                                    <div className="education-item flex items-center gap-4">
                                        <img src={education.logo} alt="Logo" 
                                            className="education-logo w-12 h-12" 
                                        />
                                        <div className="education-details flex-1">
                                            <h3 className="font-semibold text-lg">{education.institution}</h3>
                                            <p>{education.degree}</p>
                                            <p>{education.duration}</p>
                                        </div>
                                    </div>
                                    <button className="edit-item-button absolute right-2 bottom-2 p-2 bg-green-700 text-white rounded-md text-sm hover:bg-blue-500">
                                        Edit
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="add-more-container flex justify-left mt-4">
                            <button className="add-more-button p-2 bg-green-700 text-white rounded-md text-lg cursor-pointer hover:bg-green-600">
                                Add More +
                            </button>
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section className="mt-0">
                        <h3 className="text-xl flex flex-row font-semibold mb-4">Skills</h3>
                        <div className="flex flex-row flex-wrap justify-start items-center p-4 mb-4 rounded-xl gap-0 bg-green-opacity-10">
                            {Skills.map((skill) => (
                                <div key={skill.id} className="flex items-center p-2 rounded-xl border-green-opacity-30">
                                    <img src={`https://skillicons.dev/icons?i=${skill.logo}`} alt="Skill Logo" 
                                        className="skill-logo w-16 h-16" 
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="add-more-container flex justify-left mt-4">
                            <button className="add-more-button p-2 bg-green-700 text-white rounded-md text-lg cursor-pointer hover:bg-green-600">
                                Add More +
                            </button>
                        </div>
                    </section>

                    {/* Past Experience Section */}
                    <section className="experience mt-0">
                        <h3 className="text-xl font-semibold mb-4">Past Experience</h3>
                        <div className="rounded-xl p-3">
                            {Experiences.map((experience) => (
                                <div className="experience-item-container flex items-center bg-green-opacity-5 rounded-lg p-3 mb-4">
                                    <div className="experience-item flex items-center gap-4">
                                        <img src={experience.logo} alt="Logo"

                                            className="experience-logo w-12 h-12"
                                        />
                                        <div className="experience-details flex-1">
                                            <h3 className="font-semibold text-lg">{experience.organization}</h3>
                                            <p>{experience.position}</p>
                                            <p>{experience.duration}</p>
                                        </div>
                                    </div>
                                    <button className="edit-item-button absolute right-2 bottom-2 p-2 bg-green-700 text-white rounded-md text-sm hover:bg-blue-500">
                                        Edit
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="add-more-container flex justify-left mt-4">
                            <button className="add-more-button p-2 bg-green-700 text-white rounded-md text-lg cursor-pointer hover:bg-green-600">
                                Add More +
                            </button>
                        </div>
                    </section>
                </div>

                {/* Right Panel */}
                <div className="right-panel order-first lg:order-none lg:w-1/3 lg:sticky lg:top-24 z-10 p-5 bg-green-50 rounded-xl shadow-lg h-[100vh] md:h-[85vh] box-border">
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
                    <div className=" mt-6">
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
