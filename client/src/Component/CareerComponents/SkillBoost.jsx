import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark, faBars, faFilter, faX, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../Navbar';
const url = process.env.REACT_APP_API_URL;

const SkillBoost = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedSector, setSelectedSector] = useState('Default');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedJobs, setBookmarkedJobs] = useState({});
  const [jobRoles, setJobRoles] = useState([]);
  const [jobSectors, setJobSectors] = useState([
    "Default", "Web Development", "Cybersecurity", "Artificial Intelligence",
    "Data Science", "Cloud Computing", "Game Development", "Machine Learning",
    "Data Analysis", "Mobile Development"
  ]);



  // Fetching data based on selected sector
  useEffect(() => {
    fetch(`${url}/api/job-roles?sector=${encodeURIComponent(selectedSector)}`)


      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJobRoles(data);  // Update state with job roles based on selected sector
      })
      .catch((error) => {
        console.error('Error fetching job roles:', error);
      });
  }, [selectedSector]);

  const filteredJobRoles = (jobRoles || []).filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const employeeData = JSON.parse(localStorage.getItem("user"));
        if (!employeeData) return;

        const response = await fetch(`${url}/api/get-bookmarks/${employeeData.uuid}`);
        if (!response.ok) throw new Error("Failed to fetch bookmarks");

        const data = await response.json();
        const bookmarks = data.reduce((acc, jobid) => {
          acc[jobid] = true;
          return acc;
        }, {});

        setBookmarkedJobs(bookmarks);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);



  const handleSectorSelect = async (sector) => {
    setSelectedSector(sector);
    const response = await fetch(`${url}/api/job-roles?sector=${encodeURIComponent(sector)}`);
    if (!response || response.status === 404) {
      setJobRoles([]);
    }
    else {

      const data = await response.json();
      setJobRoles(data);
      console.log(data);
    }
    setMenuVisible(false);
  };


  const toggleBookmark = async (jobid) => {
    try {
      const employeeData = JSON.parse(localStorage.getItem("user"));
      if (!employeeData) {
        toast.error("User not authenticated!", {
          position: "bottom-center",
          autoClose: 2000,
          theme: "colored",
        });
        return;
      }

      const employeeId = employeeData.uuid;

      const response = await fetch(`${url}/api/toggle-bookmark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobid, employeeId }),
      });

      if (!response.ok) throw new Error("Failed to update bookmark");

      const result = await response.json();

      setBookmarkedJobs(prev => ({
        ...prev,
        [jobid]: result.bookmarked,
      }));

      toast.success(result.message, { position: "bottom-center", autoClose: 2000 });

    } catch (error) {
      console.error("Error updating bookmark:", error);
      toast.error("Failed to update bookmark!", { position: "bottom-center" });
    }
  };







  return (
    <div className="">
      <Navbar />
      <div className={`bg-background relative`}>
        <Toaster />
        <div className={`p-4 flex flex-col border-2 ${menuVisible ? 'blur-xl' : ''}`}>
          {/* Header */}
          <div className="mb-2 flex-col justify-center items-center">
            <div className="flex items-center mb-4">
              <button className="p-2 focus:outline-none mr-4" onClick={() => setMenuVisible(!menuVisible)}>
                <FontAwesomeIcon icon={faBars} size="xl" />
              </button>
              <div>
                <h1 className="text-2xl uppercase tracking-wider font-bold text-black">Skill Gap Analysis</h1>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-col items-end justify-center">
            <p className="text-lg text-[#5C5C5C] text-center mb-4">
              Compare your current skills with job requirements and find ways to grow!
            </p>
            <div className="w-full flex justify-center items-center">
              <div className="relative w-1/2 justify-center items-end">
                <input
                  type="text"
                  placeholder="Search for posts"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 py-4 px-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1C1B1A] text-[#121211] text-lg"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg hover:text-black hover:scale-105 cursor-pointer"
                />
              </div>
              <FontAwesomeIcon
                icon={faFilter}
                size="xl"
                className="p-2"
                onClick={() => setMenuVisible(!menuVisible)}
              />
            </div>
          </div>

          {/* Dynamic Sector Title */}
          <h2 className="text-2xl text-center uppercase tracking-wider font-bold text-[#393838] m-8">
            {selectedSector === 'Default' ? 'All Jobs' : selectedSector}
          </h2>

          {/* Job Role Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-12/12 mx-auto bg-[#f4f4f4] p-6 rounded-lg shadow-xl">
            {filteredJobRoles.length > 0 ? (
              filteredJobRoles.map((role, index) => (
                <JobRoleCard key={index} role={role} toggleBookmark={toggleBookmark} bookmarkedJobs={bookmarkedJobs} navigate={navigate} />
              ))
            ) : (
              <p className="text-lg text-gray-500">No jobs available for the selected sector.</p>
            )}
          </div>
        </div>

        {/* Hidden Menu */}
        {menuVisible && (
          <div className="w-full h-[100vh] absolute top-0 z-10 flex align-middle items-center justify-center">
            <div className="items-center justify-center w-9/12 sm:w-4/12 rounded-md backdrop-blur-md bg-[#d3dad99d] left-0 p-4 shadow-lg transition-transform duration-300">
              <div className="border-b-2 w-100%">
                <h2 className="text-2xl text-center tracking-widest font-Bai_Jamjuree font-bold text-[#393737] uppercase border-b-2 border-b-black w-full">
                  Select your job sectors
                </h2>
              </div>
              {jobSectors.map((sector, index) => (
                <button
                  key={index}
                  className="w-full p-2 mt-4 font-Bai_Jamjuree text-base font-bold text-[#393737] border-2 border-[#3937377b] rounded-md focus:outline-none hover:bg-[#89b195] hover:text-white"
                  onClick={() => handleSectorSelect(sector)}
                >
                  {sector}
                </button>
              ))}
            </div>
            <FontAwesomeIcon
              icon={faX}
              size="lg"
              color="red"
              className="absolute top-2 right-2"
              onClick={() => setMenuVisible(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Keeping JobRoleCard component intact
const JobRoleCard = ({ role, toggleBookmark, bookmarkedJobs, navigate }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="bg-[#afc9b7] hover:bg-[#89b195] text-black p-6 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border-2 border-[#6c858060] flex justify-between items-center"
    >
      <div className="cursor-pointer" onClick={() => navigate(`/skill-boost/${role.jobid}`)}>
        <h2 className="text-2xl tracking-wide font-bold font-Bai_Jamjuree">{role.name}</h2>
        <p className="mt-2 text-base">{role.description}</p>
      </div>
      <motion.button
        className="ml-4 focus:outline-none"
        onClick={() => toggleBookmark(role.jobid)}
        whileHover={{ scale: 1.2 }}
      >
        <FontAwesomeIcon
          icon={bookmarkedJobs[role.jobid] ? solidBookmark : regularBookmark}
          size="xl"
        />
      </motion.button>



    </motion.div>
  );
};

export default SkillBoost;
