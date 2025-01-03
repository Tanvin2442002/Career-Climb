import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar';

const SkillBoost = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [expandedSector, setExpandedSector] = useState(null);
  const [selectedSector, setSelectedSector] = useState('Default');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedJobs, setBookmarkedJobs] = useState({});

  const jobSectors = [
    { sector: 'Show All', jobs: ['3D Animator', 'Backend Developer', 'Cloud Architect','Cybersecurity Analyst', 'Fullstack Developer','AI Engineer'] },
    { sector: 'Web Development', jobs: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'] },
    { sector: 'Cybersecurity', jobs: ['Cybersecurity Analyst', 'Ethical Hacker', 'Incident Responder'] },
    { sector: 'Artificial Intelligence', jobs: ['AI Engineer', 'Machine Learning Engineer', 'NLP Specialist'] },
    { sector: 'Data Science', jobs: ['Data Scientist', 'Data Analyst', 'Data Engineer'] },
    { sector: 'Cloud Computing', jobs: ['Cloud Engineer', 'Cloud Architect', 'Cloud Consultant'] },
    { sector: 'Game Development', jobs: ['Game Designer', 'Game Developer', '3D Animator'] },
  ];

  const jobRoles = {
    Default: [
      { title: 'Web Developer', description: 'Specialize in creating websites and web applications.' },
      { title: 'Cybersecurity Analyst', description: 'Protect systems and networks from cyber threats.' },
      { title: 'AI/ML Engineer', description: 'Design and implement AI and machine learning models.' },
      { title: 'Data Scientist', description: 'Analyze and interpret complex datasets for actionable insights.' },
      { title: 'Cloud Engineer', description: 'Manage cloud infrastructure and services.' },
      { title: 'Game Developer', description: 'Design and develop video games or simulations.' },
    ],
    'Show All': [
      { title: 'Blockchain Developer', description: 'Develop and maintain blockchain-based applications.' },
      { title: 'DevOps Engineer', description: 'Optimize development workflows and deployment processes.' },
      { title: 'React Developer', description: 'Specialize in React-based applications.' },
      { title: 'Security Engineer', description: 'Ensure security protocols for systems.' },
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
      { title: '3D Animator', description: 'Create 3D animations and effects for games.' },
    ],
  };

  const filteredJobRoles =
    jobRoles[selectedSector]?.filter((role) =>
      role.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const toggleSectorDropdown = (sector) => {
    setExpandedSector((prev) => (prev === sector ? null : sector));
  };

  const handleSectorSelect = (sector) => {
    setSelectedSector(sector || 'Default');
    setMenuVisible(false);
    console.log('Selected Sector:', sector);
  };

  const toggleBookmark = (jobTitle) => {
    setBookmarkedJobs((prev) => ({
      ...prev,
      [jobTitle]: !prev[jobTitle],
    }));
  };

  return (
    <div className={`bg-[#f9f9f9] min-h-screen relative ${menuVisible ? 'pl-80' : ''}`}>
      <Navbar />
      <div className="p-6">
{/* Header */}
<div className="mb-8">
  <div className="flex items-center mb-4">
    <button
      className="p-2 focus:outline-none mr-4"
      onClick={() => setMenuVisible(!menuVisible)}
    >
      <div className="w-6 h-1 bg-black mb-1"></div>
      <div className="w-6 h-1 bg-black mb-1"></div>
      <div className="w-6 h-1 bg-black"></div>
    </button>
    <div>
      <h1 className="text-5xl font-bold text-black">Skill Gap Analysis</h1>
      
    </div>
  </div>
  <p className="text-lg text-[#5C5C5C]">
    Compare your current skills with job requirements and find ways to grow!
  </p>
</div>


{/* Search Bar */}
<div className="mt-6 flex justify-center items-center mb-6">
  <div className="relative w-1/2">
    <input
      type="text"
      placeholder="Search for posts"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
       className="w-full py-4 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#1C1B1A] text-[#121211] text-lg"
    />
    <FontAwesomeIcon
      icon={faMagnifyingGlass}
      className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
    />
  </div>
</div>




        {/* Dynamic Sector Title */}
        <h2 className="text-3xl font-bold text-left text-black mb-4 ml-8">
          {selectedSector === 'Default' ? 'All Jobs' : selectedSector}
        </h2>

        {/* Job Role Buttons */}
        <div className="grid grid-cols-2 gap-12 max-w-7xl mx-auto bg-[#f4f4f4] p-12 rounded-lg shadow-xl">
          {filteredJobRoles.length > 0 ? (
            filteredJobRoles.map((role, index) => (
              <div
                key={index}
                className="bg-[#A5C2AE] text-black p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border-2 border-[#6C8580] flex justify-between items-center"
              >
                <div>
                  <h2 className="text-2xl font-bold">{role.title}</h2>
                  <p className="mt-3 text-lg">{role.description}</p>
                </div>
                <button
                  className="ml-4 focus:outline-none"
                  onClick={() => toggleBookmark(role.title)}
                >
                  <FontAwesomeIcon
                    icon={bookmarkedJobs[role.title] ? solidBookmark : regularBookmark}
                    size="2x"
                  />
                </button>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-500">No jobs available for the selected sector.</p>
          )}
        </div>
      </div>

      {/* Hidden Menu */}
      <div
        className={`absolute top-0 left-0 h-full bg-[#d8e2d9] p-8 shadow-lg transition-transform duration-300 ${
          menuVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Title and Line */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#7c5e10] mb-4">Job Sectors</h2>
          <div className="border-t border-[#7c5e10] w-[95%] mx-auto mt-7 mb-7"></div>
          
        </div>

        {/* Dropdown Buttons */}
        {jobSectors.map((sector, index) => (
          <div key={index} className="mb-6">
            <button
              className="w-full text-left bg-[#8CAB95] text-[#1C1B1A] p-4 rounded-lg font-semibold cursor-pointer hover:bg-[#6C8B75] transition-all duration-300 flex justify-between items-center"
              onClick={() => toggleSectorDropdown(sector.sector)}
            >
              <span>{sector.sector}</span>
              <span className={`text-lg ${expandedSector === sector.sector ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {expandedSector === sector.sector && (
              <div className="mt-4 pl-6">
                {sector.jobs.map((job, idx) => (
                  <div key={idx} className="flex items-start mb-2">
                    <span className="text-[#121211] mr-2">•</span> {/* Bullet matching text color */}
                    <button
                      className="text-left text-[#121211] font-semi-bold hover:text-[#6B461F] hover:underline transition-colors duration-200"
                      onClick={() => handleSectorSelect(sector.sector)}
                    >
                      {job}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillBoost;
