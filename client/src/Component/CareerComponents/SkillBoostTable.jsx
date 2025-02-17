import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Navbar from '../Navbar';

const url = process.env.REACT_APP_API_URL;

const SkillBoostPage = () => {
    const { role_id } = useParams();
    const navigate = useNavigate();
    const [roleData, setRoleData] = useState(null);
    const [popupContent, setPopupContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recommendedJobs, setRecommendedJobs] = useState([]);


    console.log("ID", role_id);

    useEffect(() => {
        const fetchRoleData = async () => {
            try {
                const response = await fetch(`${url}/api/roles/${role_id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch role data");
                }
                const data = await response.json();
                setRoleData(data.data);

                 // Fetch recommended jobs based on role's skill IDs
                 if (data.data.skills.length > 0) {
                    const skillIds = data.data.skills.map(skill => skill.skill_id);
                    fetchRecommendedJobs(skillIds);
                }
                console.log(data);
            } catch (error) {
                console.error("Error fetching role data:", error);
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
       var act='';
       
        actionDetails.forEach(element => {
            act+=element;
            
            
        });
        console.log(act);
        setPopupContent(act);
    };

    const closePopup = () => {
        setPopupContent(null);
    };

    if (loading) return <p className="text-center text-lg">Loading...</p>;

      // function to handle current level change
      const handleLevelChange = (e, skillId) => {
        const updatedSkills = roleData.skills.map(skill => 
            skill.skill_id === skillId ? {...skill, currentLevel: e.target.value} : skill
        );
        setRoleData({...roleData, skills: updatedSkills});

        // trigger the backend to calculate the new estimated time
        updateEstimatedTime(skillId, e.target.value);
    };

    // function to call backend for updating the estimated time based on the selected level
    const updateEstimatedTime = async (skillId, newLevel) => {
        try {
            const response = await fetch(`${url}/api/skills/update-time`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skillId, newLevel }),
            });
            const data = await response.json();
            // Update the estimated time based on the new data
            const updatedSkills = roleData.skills.map(skill => 
                skill.skill_id === skillId ? {...skill, estimatedTime: data.estimatedTime, currentLevel: newLevel} : skill
            );
            setRoleData({...roleData, skills: updatedSkills});
        } catch (error) {
            console.error("Error updating estimated time:", error);
        }
    };

    if (loading) return <p className="text-center text-lg">Loading...</p>;

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
                        <thead>
                            <tr className="bg-[#9DBAAD] text-black">
                                <th className="py-5 px-6 text-lg font-bold">Skill</th>
                                <th className="py-5 px-6 text-lg font-bold">Required Level</th>
                                <th className="py-5 px-6 text-lg font-bold">Current Level</th>
                                <th className="py-5 px-6 text-lg font-bold">Learning Resources</th>
                                <th className="py-5 px-6 text-lg font-bold">Estimated Time</th>
                                <th className="py-5 px-6 text-lg font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roleData?.skills && roleData.skills.length > 0 ? (
                                roleData.skills.map((skill, index) => (
                                    <tr key={index} className="bg-[#E6F2E5] hover:bg-[#D2E8D8]">
                                        <td className="py-4 px-6">{skill.name}</td>
                                        <td className="py-4 px-6">{skill.requiredLevel}</td>
                                                {/* Updated cell to include a dropdown for selecting current level */}
                                                <td className="py-4 px-6">
                                            <select
                                                value={skill.currentLevel}
                                                onChange={(e) => handleLevelChange(e, skill.skill_id)}
                                                className="border rounded px-4 py-2"
                                            >
                                                <option value="Novice">Novice</option>
                                                <option value="Proficient">Proficient</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Developing">Developing</option>
                                            </select>
                                        </td>
                                        <td className="py-4 px-6">{skill.learningResources?.join(', ') || "N/A"}</td>
                                        <td className="py-4 px-6">{skill.estimatedTime} months</td>
                                        <td className="py-4 px-6 text-center">
                                            <button
                                                className="text-blue-500 hover:underline"
                                                onClick={() => handlePopup(skill.actionDetails)}
                                            >
                                                View Action
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-4 px-6 text-center">No skill data available</td>
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
                className="bg-[#E8E8E8] p-3 border border-gray-400 rounded-lg shadow-md transition-all duration-300 
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
    className="text-black bg-[#9DBAAD] border border-[#9DBAAD] px-5 py-2 rounded-lg font-semibold transition-all duration-300 
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
