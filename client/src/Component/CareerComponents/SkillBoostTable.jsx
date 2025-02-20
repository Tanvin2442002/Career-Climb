import React, { useState, useEffect, use } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Navbar from '../Navbar';
import Loader from "../../UI/Loader";
import LoaderMini from "../../UI/UniversalLoader";
import Error from "../../UI/Error";
import Google from '../../Assets/google.svg';
import Youtube from '../../Assets/youtube.png';

const url = process.env.REACT_APP_API_URL;

const SkillBoostPage = () => {
    const navigate = useNavigate();
    const { role_id } = useParams();
    const [roleData, setRoleData] = useState(null);
    const [popupContent, setPopupContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const [loadRequiredTime, setLoadRequiredTime] = useState(false);
    const [error, isError] = useState(false);
    const [roleName , setRoleName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [googleLink, setGoogleLink] = useState("https://www.google.com/");
    const [youtubeLink, setYoutubeLink] = useState("https://www.youtube.com/");

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`${url}/api/skill-info?role_id=${role_id}`);
                const data = await response.json();
                setRoleData(data.response);

                setRoleName(data.roleName.name);

                if (data.response && data.response[0]) {
                    const skillName = data.response[0]?.skill_name || "Unknown Skill";  // Update this based on your actual data
                    setGoogleLink(`https://www.google.com/search?q=${skillName.trim().split(' ').join('%20')}`);
                    setYoutubeLink(`https://www.youtube.com/results?search_query=${skillName.trim().split(' ').join('+')}`);
                }
            } catch (error) {
                isError(true);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }

        };
        

        const fetchRecommendedJobs = async () => {
            try {
                const response = await fetch(`${url}/api/jobs/recommended?role_id=${role_id}`);

                if (!response.ok) throw new Error("Failed to fetch jobs");

                const data = await response.json();
                setRecommendedJobs(data.jobs);
            } catch (error) {
                console.error("Error fetching recommended jobs:", error);
            }
        };


        fetchDetails();
        fetchRecommendedJobs();
    }, [role_id]);

    const handlePopup = (actionDetails,skill_name) => {
        // Default to "No action details available" if no actionDetails are passed
        const act = actionDetails || "No action details available";
    
        // Generate YouTube link and Google search query based on the skill
        
        const youtubeLink = `https://www.youtube.com/results?search_query=${skill_name.trim().split(' ').join('+')}`;
        const googleLink = `https://www.google.com/search?q=${skill_name.trim().split(' ').join('%20')}`;
    
        // Set the state with both action details and dynamic links
        setPopupContent({
            actionDetails: act,
           
            youtubeLink,
            googleLink
        });
    };
    

    const closePopup = () => {
        setPopupContent(null);
    };

    const handleLevelChange = async (e, skill_name, required_level) => {
        const current_level = e.target.value;
        setLoadRequiredTime(true);
        const response = await fetch(`${url}/api/skill-info/update-time`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role_id,
                skill_name,
                current_level,
                required_level,
            }),
        });

        const data = await response.json();

        if (data.response) {
            const updatedSkills = roleData;
            updatedSkills.forEach((skill) => {
                if (skill.skill_name === skill_name) {
                    skill.currentLevel = current_level;
                    skill.required_time = data.response.estimated_time;
                }
            });

            setRoleData(updatedSkills);
        }

        setLoadRequiredTime(false);
    };

    console.log(roleData);
    

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
                    {roleName || "Skill Boost Analysis"}
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
                                                    onChange={(e) => handleLevelChange(e, skill.skill_name, skill.required_level)}
                                                    className="px-3border rounded px-4 py-2 bg-[#E6F2E5] hover:bg-[#b0cbb7] focus:border-2"
                                                >

                                                    <option value="Beginner">Beginner</option>
                                                    <option value="Novice">Novice</option>
                                                    <option value="Intermediate">Intermediate</option>
                                                    <option value="Advanced">Advanced</option>
                                                    <option value="Expert">Expert</option>
                                                </select>
                                            </td>
                                            <td className="px-3 text-center py-5 font-semibold">{skill.learning_resources?.join(', ') || "N/A"}</td>
                                            {(loadRequiredTime) ?
                                                (
                                                    <td className="px-3 text-center">
                                                        <LoaderMini/>
                                                    </td>
                                                ) :
                                                (
                                                    <td className="px-3 text-center">{skill.required_time}</td>
                                                )
                                            }
                                            <td className="px-3 text-center">
                                                <button
                                                    className="px-3text-blue-500 hover:underline"
                                                    onClick={() => handlePopup(skill.action,skill.skill_name)}
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
                                    className="bg-green-opacity-10 p-3 border border-green-opacity-30 rounded-lg shadow-md transition-all duration-300 
                           hover:bg-green-opacity-30 hover:shadow-2xl hover:scale-105 flex flex-col justify-center items-center text-center w-[470px]"
                                    style={{ transition: "background-color 0.3s ease-in-out" }}
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
                                                onClick={() => navigate(`/jobs`)}
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

                {/* Display action details */}
                <p className="text-black text-lg mb-4">{popupContent.actionDetails}</p>

                {/* Display the generated description */}
                <p className="text-black text-lg">{popupContent.description}</p>

                {/* Google and YouTube links */}
                <div className='border-t-2 border-gray-500 p-2'>
    <p>Find more resources using these pre-filled search queries:</p>
    <div className='p-2 flex flex-row justify-center items-center space-x-2 h-12'>
        <a
            href={googleLink}
            target="_blank"
            rel="noopener noreferrer"
            className='flex justify-center items-center space-x-2 border-2 p-1 rounded-md hover:shadow-md hover:bg-gray-200 cursor-pointer'>
            <img src={Google} alt='Google' className='h-6 w-6' />
            <p>Google</p>
        </a>
        <a
            href={youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className='flex justify-center items-center space-x-2 border-2 p-1 rounded-md hover:shadow-md hover:bg-gray-200 cursor-pointer'>
            <img src={Youtube} alt='YouTube' className='h-6 w-6' />
            <p>YouTube</p>
        </a>
    </div>
</div>

            </div>
        </motion.div>
    )}
</AnimatePresence>
            </div>
        </div>
    );
};

export default SkillBoostPage;
