import React, { useState } from "react";
import Navbar from "./Navbar";
import MIST from '../Assets/mist.jpeg';
import user from '../Assets/user.png';
import savar from '../Assets/savar.jpeg';
import MCC from '../Assets/MCC.png';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenToSquare, faCloudArrowUp, faEye } from "@fortawesome/free-solid-svg-icons";

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
    // add github, javascript, postgres, ardiuno, figma, postman
    { id: 13, logo: "github" },
    { id: 14, logo: "javascript" },
    { id: 15, logo: "postgres" },
    { id: 16, logo: "arduino" },
    { id: 17, logo: "figma" },
    { id: 18, logo: "postman" },
]

const Experiences = [
    { id: 1, logo: MCC, organization: "MIST Computer Club", position: "Assistant Secretary", duration: "Feb 2024 – Present" },
    { id: 2, logo: MCC, organization: "MIST Computer Club", position: "Instructor", duration: "Feb 2023 – Present" },
]


const Myprofile = () => {
    const [pdfPreview, setPdfPreview] = useState(null); // For storing the preview URL
    const [popupVisible, setPopupVisible] = useState(false); // For toggling popup
    const [rating, setRating] = useState(3); // Default rating

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Store the PDF in sessionStorage as a Base64 string
                sessionStorage.setItem("uploadedCV", e.target.result);
                alert("CV uploaded successfully!");
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const handleViewCV = () => {
        const storedPdf = sessionStorage.getItem("uploadedCV");
        if (storedPdf) {
            setPdfPreview(storedPdf);
            setPopupVisible(true);
        } else {
            alert("No CV found. Please upload your CV first.");
        }
    };

    // Function to handle hover and rating change
    const handleHover = (index) => {
        setRating(index);
    };

    const handleClick = (index) => {
        setRating(index); // Set rating permanently on click
    };


    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    return (
        <div className="flex flex-col font-Poppins bg-white">
            <Navbar />
            <div className="flex flex-col lg:flex-row w-full p-5">
                <div className="flex flex-col w-full lg:w-2/3 mr-5 gap-5">
                    {/* Education Section */}
                    <section className="flex flex-col justify-center">
                        <h3 className="text-xl font-semibold mx-3">Education</h3>
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
                                </div>
                            ))}
                        </div>
                        <div className="mx-3  bg-green hover:bg-green-700 text-white rounded-md text-lg cursor-pointer w-28">
                            <FontAwesomeIcon icon={faPlus} className="ml-2" />
                            <button className="p-1 text-white rounded-md text-base ">
                                Add More
                            </button>
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section className="mt-0">
                        <h3 className="text-xl flex flex-row font-semibold mx-4">Skills</h3>
                        <div className="flex flex-row flex-wrap justify-start items-center mx-3 p-4 mb-4 rounded-xl gap-0 border-2 border-gray-300 bg-green-opacity-10">
                            {Skills.map((skill) => (
                                <div key={skill.id} className="flex items-center p-2 rounded-xl border-green-opacity-30">
                                    <img src={`https://skillicons.dev/icons?i=${skill.logo}`} alt="Skill Logo"
                                        className="skill-logo w-16 h-16"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mx-3  bg-green hover:bg-green-700 text-white rounded-md text-lg cursor-pointer w-28">
                            <FontAwesomeIcon icon={faPlus} className="ml-2" />
                            <button className="p-1 text-white rounded-md text-base ">
                                Add More
                            </button>
                        </div>
                    </section>

                    {/* Past Experience Section */}
                    <section className="experience mt-0">
                        <h3 className="text-xl font-semibold mx-4">Past Experience</h3>
                        <div className="rounded-xl p-3">
                            {Experiences.map((experience) => (
                                <div className="experience-item-container flex items-center bg-gray-100 border-2 border-gray-300 rounded-lg p-3 mb-4">
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
                                </div>
                            ))}
                        </div>

                        <div className="mx-3  bg-green hover:bg-green-700 text-white rounded-md text-lg cursor-pointer w-28">
                            <FontAwesomeIcon icon={faPlus} className="ml-2" />
                            <button className="p-1 text-white rounded-md text-base ">
                                Add More
                            </button>
                        </div>
                    </section>
                </div>

                {/* Right Panel */}
                <div className="order-first lg:order-none lg:w-1/3 lg:sticky lg:top-24 z-10 p-5 bg-green-50 rounded-xl shadow-lg h-[100vh] md:h-[85vh] box-border">
                    <div className="profile-info text-center flex flex-col items-center justify-center">
                        <img src={user} alt="Profile" className="profile-picture w-20 h-20 rounded-full mb-2" />
                        <h3 className="font-bold font-Bai_Jamjuree text-2xl">ZAIMA AHMED</h3>
                        <p>zaimahmed101@gmail.com</p>
                        {/* Dynamic Star Rating */}
                        <div className="stars mt-1">
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
                    <div className="bio mt-2">
                        <h3 className="text-lg font-semibold mb-2">BIO</h3>
                        <textarea
                            className="bio-textarea w-full h-32 border-0 rounded-md p-2 bg-gray-50"
                            readOnly
                            placeholder="Your biography goes here..."
                        ></textarea>
                    </div>
                    {/* CV Upload and View */}
                    <div className="flex flex-col gap-0 mt-6">
                        <div className="flex flex-row justify-evenly items-center">
                            <div className="m-3 mx-3 w-48 h-8 bg-green hover:bg-green-700 text-white rounded-md text-lg cursor-pointer relative">
                                <FontAwesomeIcon icon={faCloudArrowUp} className="ml-2" />
                                <input
                                    type="file"
                                    id="cvUpload"
                                    accept="application/pdf"
                                    onChange={handleFileUpload}
                                    // style={{ display: "none" }}
                                    className="border-2 h-7 border-dashedrounded-md p-2 w-[200px] absolute top-0 left-0 opacity-0"
                                />
                                <span className="p-2 text-white rounded-md text-base ">
                                    Upload Your CV
                                </span>
                            </div>  
                            <div 
                                onClick={handleViewCV}
                                className="mx-3 bg-green hover:bg-green-700 text-white rounded-md text-lg cursor-pointer w-48 h-8 flex justify-center items-center"
                            >
                                <FontAwesomeIcon icon={faEye}/>
                                <span className="text-white rounded-md text-base p-2">
                                    View your CV
                                </span>
                            </div>
                        </div>
                        <div
                            className="mx-4 bg-green hover:bg-green-700 text-white rounded-md text-lg cursor-pointer h-8 flex justify-center items-center"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <span className="text-white rounded-md text-base p-2">
                                Edit your profile
                            </span>
                        </div>

                    </div>
                </div>

                {popupVisible && (
                    <div className="popup fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="popup-content bg-white w-[90%] h-[90%] rounded-lg shadow-lg relative">
                            <button
                                onClick={handleClosePopup}
                                className="absolute top-10 right-6 text-red-500 text-lg font-bold"
                            >
                                ×
                            </button>
                            <iframe
                                src={pdfPreview}
                                className="w-full h-full"
                                title="CV Preview"
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Myprofile;
