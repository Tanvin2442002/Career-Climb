import React, { useState, useEffect, use } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Navbar from '../Navbar';
import Loader from "../../UI/Loader";
import Error from "../../UI/Error";

const url = process.env.REACT_APP_API_URL;

const SkillBoostPage = () => {
    const { role_id } = useParams();
    const [roleData, setRoleData] = useState(null);
    const [popupContent, setPopupContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recommendedJobs, setRecommendedJobs] = useState([]);

    const [error, isError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`${url}/api/skill-info?role_id=${role_id}`);
                const data = await response.json();
                setRoleData(data.data);

                 // Fetch recommended jobs based on role's skill IDs
                 if (data.data.skills.length > 0) {
                    const skillIds = data.data.skills.map(skill => skill.skill_id);
                    fetchRecommendedJobs(skillIds);
                }
                console.log(data);
            } catch (error) {
                isError(true);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }

        };


        const fetchRecommendedJobs = async (skillIds) => {
            try {
                const response = await fetch(`${url}/api/jobs/recommended`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ skillIds }),
                });

                if (!response.ok) throw new Error("Failed to fetch jobs");

                const data = await response.json();
                setRecommendedJobs(data.jobs);
            } catch (error) {
                console.error("Error fetching recommended jobs:", error);
            }
        };


        fetchRoleData();
    }, [role_id]);
    console.log(roleData);



    const handlePopup = (actionDetails) => {
        const act = actionDetails || "No action details available";
        setPopupContent(act);
    };

    const closePopup = () => {
        setPopupContent(null);
    };

    const handleLevelChange = (e, skillId) => {
        const updatedSkills = roleData.skills.map(skill =>
            skill.skill_id === skillId ? { ...skill, currentLevel: e.target.value } : skill
        );
        setRoleData({ ...roleData, skills: updatedSkills });
        updateEstimatedTime(skillId, e.target.value);
    };

    // New function to call backend for updating the estimated time based on the selected level
    const updateEstimatedTime = async (skillId, newLevel) => {
        try {
            const response = await fetch(`${url}/api/skills/update-time`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skillId, newLevel }),
            });
            const data = await response.json();
            const updatedSkills = roleData.skills.map(skill =>
                skill.skill_id === skillId ? { ...skill, estimatedTime: data.estimatedTime, currentLevel: newLevel } : skill
            );
            setRoleData({ ...roleData, skills: updatedSkills });
        } catch (error) {
            console.error("Error updating estimated time:", error);
        }
    };

    if (loading) return (
        <div className='flex justify-center items-center h-screen'>
            <Loader message="Loading..." />
        </div>
    );

    if (error) return (
        <div className='flex justify-center items-center h-screen'>
            <Error message={errorMessage} btn />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f9f9f9] overflow-y-scroll relative">
            <Navbar />
            <div className="p-8">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'backInOut' }}
                    className="text-4xl uppercase font-bold text-black text-center"
                >
                    {roleData?.role_name || "Skill Boost Analysis"}
                </motion.h1>

                <p className="text-lg text-black mt-2 text-center">
                    {roleData?.description || "Compare your current skills with job requirements and find ways to grow!"}
                </p>

                {/* Skill Table */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: 'backInOut' }}
                    className="w-full rounded-lg overflow-hidden shadow-lg mt-6"
                >
                    <div className="bg-[#f9f9f9] overflow-x-auto max-w-full">
                        <table className="table-auto w-full border-collapse text-left">
                            <thead className='h-16'>
                                <tr className="bg-[#9DBAAD] text-black flex-col font-Bai_Jamjuree items-center justify-center">
                                    <th className="text-lg w-2/12 font-bold ">
                                        <p className="flex items-center justify-center">
                                            Skill Name
                                        </p>
                                    </th>
                                    <th className="text-lg w-[150px] font-bold ">
                                        <p className="flex items-center justify-center">
                                            Required Level
                                        </p>
                                    </th>
                                    <th className="text-lg w-1/12 font-bold ">
                                        <p className="flex items-center justify-center">
                                            Current Level
                                        </p>
                                    </th>
                                    <th className="text-lg  font-bold">
                                        <p className="flex items-center justify-center">
                                            Learning Resources
                                        </p>
                                    </th>
                                    <th className="text-lg w-[150px] font-bold ">
                                        <p className="flex items-center justify-center">
                                            Required Time
                                        </p>
                                    </th>
                                    <th className="text-lg w-1/12 font-bold ">
                                        <p className="flex items-center justify-center">
                                            Action
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {roleData && roleData.length > 0 ? (
                                    roleData.map((skill, index) => (
                                        <tr key={index} className="bg-[#E6F2E5] hover:bg-[#D2E8D8] border-b border-gray-200 flex-col items-center justify-center p-2 h-16 rounded-lg">
                                            <td className="px-3">{skill.skill_name}</td>

                                            <td className="px-3">{skill.required_level}</td>
                                            {/* Updated cell to include a dropdown for selecting current level */}
                                            <td className="px-3">
                                                <select
                                                    value={skill.currentLevel}
                                                    onChange={(e) => handleLevelChange(e, skill.skill_id)}
                                                    className="px-3border rounded px-4 py-2 bg-[#E6F2E5] hover:bg-[#b0cbb7] focus:border-2"
                                                >
                                                    <option value="Novice">Novice</option>
                                                    <option value="Proficient">Proficient</option>
                                                    <option value="Intermediate">Intermediate</option>
                                                    <option value="Developing">Developing</option>
                                                </select>
                                            </td>
                                            <td className="px-3 text-center py-5 font-semibold">{skill.learning_resources?.join(', ') || "N/A"}</td>
                                            <td className="px-3">{skill.required_time}</td>
                                            <td className="px-3 text-center">
                                                <button
                                                    className="px-3text-blue-500 hover:underline"
                                                    onClick={() => handlePopup(skill.action)}
                                                >
                                                    View Action
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className=" text-center">No skill data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

{/* Recommended Jobs Section */}

<div className="my-6 border-t border-gray-300"></div>


<div className="mt-10">

    <h2 className="text-2xl font-Poppins font-bold text-gray-800">Recommended Jobs</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {recommendedJobs.length > 0 ? (
            recommendedJobs.map((job, index) => (
                <motion.div
                key={index}
                className="bg-[#D8D8D8] p-3 border border-gray-400 rounded-lg shadow-md transition-all duration-300 
                           hover:bg-[#BEBEBE] hover:shadow-2xl hover:scale-105 flex flex-col justify-center items-center text-center w-[470px]"
                style={{ transition: "background-color 0.6s ease-in-out" }}
            >
            


            
            
            
            
                  
                    

                    {/* Job Title */}
                    <h3 className="text-lg font-bold text-[#2C3E50] mt-2">{job.role}</h3>


                    {/* Job Type and Salary */}
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-semibold">
                            {job.job_type.toUpperCase()}
                        </span>
                        {job.salary && (
                            <span className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold">
                                ${job.salary.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Job Description */}
                    <p className="text-[#2C3E50] font-semibold mt-3 text-[15px] leading-tight">
    {job.description.slice(0, 80)}...
</p>


                    {/* Location */}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-4 justify-center">
    <MapPin className="h-4 w-4 text-[#E63946]" />
    <span className="text-[#1D3557] font-semibold text-[15px]">{job.location}</span>
</div>





                    {/* Explore Button */}
                    <div className="flex justify-center mt-4">
                    <div className="flex justify-center w-full mt-5">
                    <button
    className="text-black bg-[#8CA79C] border border-[#9DBAAD] px-5 py-2 rounded-lg font-semibold transition-all duration-300 
               hover:bg-[#7F978A] hover:border-[#7F978A] hover:scale-105 shadow-sm"
    onClick={() => navigate(`/job-post/${job.post_id}`)}
>
    More Details →
</button>



</div>



</div>


                </motion.div>
            ))
        ) : (
            <p className="text-gray-600">No jobs found matching the skills.</p>
        )}
    </div>
</div>


                {/* Pop-up */}
                <AnimatePresence>
                    {popupContent && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.5, ease: 'backInOut' }}
                            className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-md bg-[rgba(0,0,0,0.3)]"
                        >
                            <div className="bg-white w-10/12 sm:w-5/12 rounded-lg p-8 shadow-2xl relative">
                                <button
                                    className="absolute top-3 right-3 text-red-500 font-bold text-2xl"
                                    onClick={closePopup}
                                >
                                    ×
                                </button>
                                <p className="text-black text-lg">{popupContent}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SkillBoostPage;
