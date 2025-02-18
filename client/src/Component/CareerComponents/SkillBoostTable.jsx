import React, { useState, useEffect, use } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import Navbar from '../Navbar';
import Loader from "../../UI/Loader";
import Error from "../../UI/Error";

const url = process.env.REACT_APP_API_URL;

const SkillBoostPage = () => {
    const { role_id } = useParams();
    const [roleData, setRoleData] = useState(null);
    const [popupContent, setPopupContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, isError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`${url}/api/skill-info?role_id=${role_id}`);
                const data = await response.json();
                console.log("Data", data);
                setRoleData(data.response);
            } catch (error) {
                isError(true);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }

        };
        fetchDetails();
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
