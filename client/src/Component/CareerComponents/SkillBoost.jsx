import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark, faBars, faFilter, faX } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../Navbar';
import { ToastContainer, toast } from 'react-toastify';

const SkillBoost = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedSector, setSelectedSector] = useState('Default');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedJobs, setBookmarkedJobs] = useState({});

  const jobSectors = ["Default", "Web Development", "Cybersecurity", "Artificial Intelligence", "Data Science", "Cloud Computing", "Game Development", "Machine Learning", "Data Analysis", "Mobile Development"];

  const jobRoles = {
    Default: [
      { title: 'Frontend Developer', description: 'Create and design user interfaces for web applications.' },
      { title: 'Backend Developer', description: 'Develop server-side logic and APIs for web applications.' },
      { title: 'Fullstack Developer', description: 'Handle both frontend and backend development tasks.' },
      { title: 'Cybersecurity Analyst', description: 'Monitor and protect systems from potential threats.' },
      { title: 'Ethical Hacker', description: 'Test systems for vulnerabilities by simulating attacks.' },
      { title: 'Incident Responder', description: 'Respond to and mitigate cybersecurity incidents.' },
      { title: 'AI Engineer', description: 'Design AI systems and applications.' },
      { title: 'Machine Learning Engineer', description: 'Build and deploy ML models for data analysis.' },
      { title: 'NLP Specialist', description: 'Work on natural language processing algorithms.' },
      { title: 'Data Scientist', description: 'Analyze and interpret complex datasets for insights.' },
      { title: 'Data Analyst', description: 'Create dashboards and analyze business data trends.' },
      { title: 'Data Engineer', description: 'Build and maintain data pipelines and infrastructure.' },
      { title: 'Cloud Engineer', description: 'Manage cloud infrastructure and services.' },
      { title: 'Cloud Architect', description: 'Design and manage cloud solutions.' },
      { title: 'Cloud Consultant', description: 'Advise businesses on cloud-based solutions.' },
      { title: 'Game Designer', description: 'Design characters and create game concepts.' },
      { title: 'Game Developer', description: 'Develop game mechanics and functionality.' },
      { title: '3D Animator', description: 'Create 3D animations and effects for games.' },
      { title: 'Machine Learning Engineer', description: 'Build and deploy ML models for data analysis.' },
      { title: 'Data Scientist', description: 'Analyze and interpret complex datasets for insights.' },
      { title: 'AI Engineer', description: 'Design AI systems and applications.' },
      { title: 'Data Analyst', description: 'Create dashboards and analyze business data trends.' },
      { title: 'Data Scientist', description: 'Analyze and interpret complex datasets for insights.' },
      { title: 'Data Engineer', description: 'Build and maintain data pipelines and infrastructure.' },
      { title: 'iOS Developer', description: 'Develop applications for iOS devices.' },
      { title: 'Android Developer', description: 'Develop applications for Android devices.' },
      { title: 'React Native Developer', description: 'Build cross-platform mobile applications.' },
    ],
    'Web Development': [
      { title: 'Frontend Developer', description: 'Create and design user interfaces for web applications.' },
      { title: 'Backend Developer', description: 'Develop server-side logic and APIs for web applications.' },
      { title: 'Fullstack Developer', description: 'Handle both frontend and backend development tasks.' },
    ],
    'Cybersecurity': [
      { title: 'Cybersecurity Analyst', description: 'Monitor and protect systems from potential threats.' },
      { title: 'Ethical Hacker', description: 'Test systems for vulnerabilities by simulating attacks.' },
      { title: 'Incident Responder', description: 'Respond to and mitigate cybersecurity incidents.' },
    ],
    'Artificial Intelligence': [
      { title: 'AI Engineer', description: 'Design AI systems and applications.' },
      { title: 'Machine Learning Engineer', description: 'Build and deploy ML models for data analysis.' },
      { title: 'NLP Specialist', description: 'Work on natural language processing algorithms.' },
    ],
    'Data Science': [
      { title: 'Data Scientist', description: 'Analyze and interpret complex datasets for insights.' },
      { title: 'Data Analyst', description: 'Create dashboards and analyze business data trends.' },
      { title: 'Data Engineer', description: 'Build and maintain data pipelines and infrastructure.' },
    ],
    'Cloud Computing': [
      { title: 'Cloud Engineer', description: 'Manage cloud infrastructure and services.' },
      { title: 'Cloud Architect', description: 'Design and manage cloud solutions.' },
      { title: 'Cloud Consultant', description: 'Advise businesses on cloud-based solutions.' },
    ],
    'Game Development': [
      { title: 'Game Designer', description: 'Design characters and create game concepts.' },
      { title: 'Game Developer', description: 'Develop game mechanics and functionality.' },
      { title: '3D Animator', description: 'Create 3D animations and effects for games' },
    ],
    'Machine Learning': [
      { title: 'Machine Learning Engineer', description: 'Build and deploy ML models for data analysis.' },
      { title: 'Data Scientist', description: 'Analyze and interpret complex datasets for insights.' },
      { title: 'AI Engineer', description: 'Design AI systems and applications.' },
    ],
    'Data Analysis': [
      { title: 'Data Analyst', description: 'Create dashboards and analyze business data trends.' },
      { title: 'Data Scientist', description: 'Analyze and interpret complex datasets for insights.' },
      { title: 'Data Engineer', description: 'Build and maintain data pipelines and infrastructure.' },
    ],
    'Mobile Development': [
      { title: 'iOS Developer', description: 'Develop applications for iOS devices.' },
      { title: 'Android Developer', description: 'Develop applications for Android devices.' },
      { title: 'React Native Developer', description: 'Build cross-platform mobile applications.' },
    ],
  };

  const filteredJobRoles = jobRoles[selectedSector].filter((role) => {
    return role.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSectorSelect = (sector) => {
    setSelectedSector(sector || 'Default');
    setMenuVisible(false);
  };

  const toggleBookmark = (jobTitle) => {
    setBookmarkedJobs((prev) => ({
      ...prev,
      [jobTitle]: !prev[jobTitle],
    }));
    // add toastify
    toast.success(`Bookmark added!`, {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  return (
    <div className=''>
      <Navbar />
      <div className={`bg-background relative`}>
        <ToastContainer/>
        <div className={`p-4 flex flex-col border-2 ${menuVisible ? 'blur-xl' : ''}`}>
          {/* Header */}
          <div className="mb-2 flex-col justify-center items-center">
            <div className="flex items-center mb-4">
              <button
                className="p-2 focus:outline-none mr-4"
                onClick={() => setMenuVisible(!menuVisible)}
              >
                <FontAwesomeIcon icon={faBars} size='xl' />
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
            <div className='w-full flex justify-center items-center'>
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
              <FontAwesomeIcon icon={faFilter} size='xl' 
                className='p-2'
                onClick={() => setMenuVisible(!menuVisible)}
              />
            </div>
          </div>

          {/* Dynamic Sector Title */}
          <h2 className="text-2xl text-center uppercase tracking-wider font-bold text-[#393838] m-8">
            {selectedSector === 'Default' ? 'All Jobs' : selectedSector}
          </h2>

          {/* Job Role Buttons */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-12/12 mx-auto bg-[#f4f4f4] p-6 rounded-lg shadow-xl`}>
            {filteredJobRoles.length > 0 ? (
              filteredJobRoles.map((role, index) => (
                <JobRoleCard key={index} role={role} toggleBookmark={toggleBookmark} bookmarkedJobs={bookmarkedJobs} />
              ))
            ) : (
              <p className="text-lg text-gray-500">No jobs available for the selected sector.</p>
            )}
          </div>
        </div>

        {/* Hidden Menu */}
        {menuVisible && (
          <div className={`w-full h-[100vh] absolute top-0 z-10 flex align-middle items-center justify-center `}>
            <div
              className={`items-center justify-center w-9/12 sm:w-4/12 rounded-md backdrop-blur-md bg-[#d3dad99d] left-0 p-4 shadow-lg transition-transform duration-300`}
            >
              {/* Title and Line */}
              <div className='border-b-2 w-100%'>
                <h2 className="text-2xl text-center tracking-widest font-Bai_Jamjuree font-bold text-[#393737] uppercase border-b-2 border-b-black w-full">select your job Sectors</h2>
              </div>
              {jobSectors.map((sector, index) => (
                <button
                  key={index}
                  className={`w-full p-2 mt-4 font-Bai_Jamjuree text-base font-bold text-[#393737] border-2 border-[#3937377b] rounded-md focus:outline-none hover:bg-[#89b195] hover:text-white`}
                  onClick={() => handleSectorSelect(sector)}
                >
                  {sector}
                </button>
              ))}
            </div>
            <FontAwesomeIcon icon={faX} size='lg' color='red' className='absolute top-2 right-2' onClick={() => setMenuVisible(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

const JobRoleCard = ({ role, toggleBookmark, bookmarkedJobs }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      className="bg-[#afc9b7] hover:bg-[#89b195] text-black p-6 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border-2 border-[#6c858060] flex justify-between items-center"
    >
      <div>
        <h2 className="text-2xl tracking-wide font-bold font-Bai_Jamjuree">{role.title}</h2>
        <p className="mt-2 text-base">{role.description}</p>
      </div>
      <motion.button
        className="ml-4 focus:outline-none"
        onClick={() => toggleBookmark(role.title)}
        whileHover={{ scale: 1.2 }}
      >
        <FontAwesomeIcon
          icon={bookmarkedJobs[role.title] ? solidBookmark : regularBookmark}
          size="xl"

        />
      </motion.button>
    </motion.div>
  );
};

export default SkillBoost;