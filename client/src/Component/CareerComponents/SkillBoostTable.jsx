import React, { useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const SkillBoostPage = () => {
    const navigate = useNavigate();
    const [popupContent, setPopupContent] = useState(null);

    const actions = {
        python: "Advance your Python skills by working on projects like web applications, data analysis pipelines, or APIs. Use resources from Codecademy, Coursera, and the Python official documentation.",
        git: "Master Git by learning rebasing, cherry-picking, and handling merge conflicts. Contribute to open-source projects via GitHub, and practice with tools like GitLab CI/CD for real-world applications.",
        dsa: "Data Structures & Algorithms are critical for problem-solving. Use GeeksforGeeks, LeetCode, and HackerRank to practice dynamic programming, graph traversal, and tree algorithms regularly.",
        problemSolving: "Improve your problem-solving skills by attempting coding challenges on platforms like HackerRank and CodeWars. Focus on optimizing your solutions and understanding time complexity.",
        htmlCss: "Build responsive layouts with advanced HTML5 and CSS3 techniques. Experiment with CSS Grid, Flexbox, and TailwindCSS. Refer to MDN Web Docs for detailed tutorials and best practices.",
        jsFundamentals: "Learn JavaScript ES6+ features like modules, async/await, and arrow functions. Build small projects like calculators or interactive web components to apply your knowledge. Use MDN Web Docs and JavaScript.info.",
        reactAngular: "Dive into React or Angular frameworks by building dynamic web applications. Use resources from React Docs, Udemy, and YouTube tutorials to master hooks, state management, and lifecycle methods."
    };

    const handlePopup = (actionKey) => {
        setPopupContent(actions[actionKey]);
    };

    const closePopup = () => {
        setPopupContent(null);
    };

    return (
        <div className="min-h-screen bg-[#f9f9f9] overflow-y-scroll relative">
            <Navbar />
            <div className="p-8">
                <div className="text-left mb-8">
                    <h1 className="text-4xl font-bold text-black">Skill Boost Analysis</h1>
                    <p className="text-lg text-black mt-2">
                        Compare your current skills with job requirements and find ways to grow!
                    </p>
                </div>
                <div className="text-left mt-12">
                    <h1 className="text-2xl font text-[#5A3C1B]">
                        Showing analysis to help you become a Front-End Developer
                    </h1>
                </div>

                <div className="mt-12">
                    {/* Skill Table */}
                    <div className="w-full rounded-lg overflow-hidden shadow-lg mt-6">
                        <table className="table-auto w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-[#9DBAAD] text-black">
                                    <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Skill</th>
                                    <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Required Level</th>
                                    <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Current Status</th>
                                    <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Learning Resources</th>
                                    <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Priority Level</th>
                                    <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Estimated Time to Improve</th>
                                    <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gradient-to-r from-[#E6F2E5] via-[#DCECE2] to-[#D2E8D8] hover:bg-gradient-to-r hover:from-[#D2E8D8] hover:via-[#C8E3CF] hover:to-[#BEE0C6]">
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Programming in Python</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Proficient</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Intermediate</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Codecademy, Coursera</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">High</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">2-3 months</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8] text-center">
                                        <button
                                            className="text-[#007BFF] hover:underline hover:text-[#0056b3]"
                                            onClick={() => handlePopup('python')}
                                        >
                                            Complete advanced Python projects or courses
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-gradient-to-r from-[#E6F2E5] via-[#DCECE2] to-[#D2E8D8] hover:bg-gradient-to-r hover:from-[#D2E8D8] hover:via-[#C8E3CF] hover:to-[#BEE0C6]">
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Version Control (Git)</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Strong</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Basic</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">GitHub Docs, GitLab</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">High</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">1-2 months</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8] text-center">
                                        <button
                                            className="text-[#007BFF] hover:underline hover:text-[#0056b3]"
                                            onClick={() => handlePopup('git')}
                                        >
                                            Contribute to open-source projects
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-gradient-to-r from-[#E6F2E5] via-[#DCECE2] to-[#D2E8D8] hover:bg-gradient-to-r hover:from-[#D2E8D8] hover:via-[#C8E3CF] hover:to-[#BEE0C6]">
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Data Structures & Algorithms</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Strong</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Missing</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">GeeksforGeeks, LeetCode</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">High</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">3-4 months</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8] text-center">
                                        <button
                                            className="text-[#007BFF] hover:underline hover:text-[#0056b3]"
                                            onClick={() => handlePopup('dsa')}
                                        >
                                            Enroll in a DSA-focused program
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-gradient-to-r from-[#E6F2E5] via-[#DCECE2] to-[#D2E8D8] hover:bg-gradient-to-r hover:from-[#D2E8D8] hover:via-[#C8E3CF] hover:to-[#BEE0C6]">
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Problem Solving</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Strong</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Developing</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">LeetCode, HackerRank</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Medium</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">2-3 months</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8] text-center">
                                        <button
                                            className="text-[#007BFF] hover:underline hover:text-[#0056b3]"
                                            onClick={() => handlePopup('problemSolving')}
                                        >
                                            Solve coding challenges on platforms
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-gradient-to-r from-[#E6F2E5] via-[#DCECE2] to-[#D2E8D8] hover:bg-gradient-to-r hover:from-[#D2E8D8] hover:via-[#C8E3CF] hover:to-[#BEE0C6]">
                                    <td className="py-4 px-6 border border-[#B9D7B8]">HTML/CSS Expertise</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Proficient</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Intermediate</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">MDN Web Docs, TailwindCSS</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">High</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">1-2 months</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8] text-center">
                                        <button
                                            className="text-[#007BFF] hover:underline hover:text-[#0056b3]"
                                            onClick={() => handlePopup('htmlCss')}
                                        >
                                            Build complex web layouts
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-gradient-to-r from-[#E6F2E5] via-[#DCECE2] to-[#D2E8D8] hover:bg-gradient-to-r hover:from-[#D2E8D8] hover:via-[#C8E3CF] hover:to-[#BEE0C6]">
                                    <td className="py-4 px-6 border border-[#B9D7B8]">JavaScript Fundamentals</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Proficient</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Developing</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">MDN Web Docs, JavaScript.info</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">High</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">2-3 months</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8] text-center">
                                        <button
                                            className="text-[#007BFF] hover:underline hover:text-[#0056b3]"
                                            onClick={() => handlePopup('jsFundamentals')}
                                        >
                                            Work on JavaScript projects
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-gradient-to-r from-[#E6F2E5] via-[#DCECE2] to-[#D2E8D8] hover:bg-gradient-to-r hover:from-[#D2E8D8] hover:via-[#C8E3CF] hover:to-[#BEE0C6]">
                                    <td className="py-4 px-6 border border-[#B9D7B8]">React/Angular Frameworks</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Strong</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">Missing</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">React Docs, Angular Docs</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">High</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">3-4 months</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8] text-center">
                                        <button
                                            className="text-[#007BFF] hover:underline hover:text-[#0056b3]"
                                            onClick={() => handlePopup('reactAngular')}
                                        >
                                            Enroll in courses focused on React
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
{/* Pop-up */}
{popupContent && (
    <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-md bg-[rgba(0,0,0,0.3)]">
        <div className="bg-white w-10/12 sm:w-5/12 rounded-lg p-8 shadow-2xl relative transform scale-105">
            {/* Close Button */}
            <button
                className="absolute top-3 right-3 text-red-500 font-bold text-2xl hover:text-red-700 hover:scale-110 transition-all duration-300"
                onClick={closePopup}
            >
                ×
            </button>
            {/* Pop-up Content */}
            <p className="text-black text-lg leading-relaxed">{popupContent}</p>
        </div>
    </div>
)}



                {/* "Want to see the Road Map" Section */}
                <div className="text-left mt-6">
                    <button
                        onClick={() => navigate('/CareerRoadMap')}
                        className="text-[#704F2A] text-lg hover:underline hover:text-[#5A3C1B] transition-all duration-300"
                    >
                        Want to see the Road Map to this post?
                    </button>
                </div>

                {/* People Also Search For Section */}
                <div className="mt-16">
                    <div className="border-t border-gray-300 mb-6"></div>
                    <h2 className="text-2xl font-bold text-[#704F2A] mb-8">People also search for :</h2>
                    <div className="grid grid-cols-4 gap-8">
                        {['Data Scientist', 'Fullstack Developer', 'Blockchain Developer', 'AI Engineer'].map(
                            (role, index) => (
                                <div
                                    key={index}
                                    className="bg-[rgba(65,154,91,0.1)] p-10 rounded-lg shadow-lg text-center hover:shadow-2xl transform hover:scale-110 transition-transform duration-300"
                                >
                                    <h3 className="text-xl font-bold text-[#704F2A] mb-4">{role}</h3>
                                    <p className="text-sm text-[#5C5C5C] mb-4">
                                        {role === 'Data Scientist'
                                            ? 'Protect systems and networks from cyber threats.'
                                            : role === 'Fullstack Developer'
                                            ? 'Handle both frontend and backend development tasks.'
                                            : role === 'Blockchain Developer'
                                            ? 'Develop and maintain blockchain-based applications.'
                                            : 'Design AI systems and applications.'}
                                    </p>
                                    <button
                                        className="bg-[#A5C2AE] text-black py-4 px-8 rounded-lg hover:bg-[#89A78D] hover:shadow-xl transition-all duration-300"
                                    >
                                        Explore now →
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillBoostPage;
