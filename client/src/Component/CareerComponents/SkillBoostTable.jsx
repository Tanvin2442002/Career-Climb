import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Navbar';

const url = process.env.REACT_APP_API_URL;

const SkillBoostPage = () => {
    const { role_id } = useParams();
    const navigate = useNavigate();
    const [roleData, setRoleData] = useState(null);
    const [popupContent, setPopupContent] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("ID", role_id);

    useEffect(() => {
        const fetchRoleData = async () => {
            try {
                const response = await fetch(`${url}/api/roles/${role_id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch role data");
                }
                const data = await response.json();
                setRoleData(data);
            } catch (error) {
                console.error("Error fetching role data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoleData();
    }, [role_id]);

    const handlePopup = (action) => {
        setPopupContent(action);
    };

    const closePopup = () => {
        setPopupContent(null);
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
                                        <td className="py-4 px-6">{skill.currentLevel}</td>
                                        <td className="py-4 px-6">{skill.learningResources?.join(', ') || "N/A"}</td>
                                        <td className="py-4 px-6">{skill.estimatedTime} months</td>
                                        <td className="py-4 px-6 text-center">
                                            <button
                                                className="text-blue-500 hover:underline"
                                                onClick={() => handlePopup(skill.action)}
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
