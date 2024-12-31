import React, { useState } from 'react';
import Navbar from '../Navbar';

const SkillBoost = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [expandedSector, setExpandedSector] = useState(null);
  const [selectedSector, setSelectedSector] = useState('Default');
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className={`bg-[#f9f9f9] min-h-screen relative ${menuVisible ? 'pl-80' : ''}`}>
      <Navbar />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button
            className="p-2 focus:outline-none mr-4"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <div className="w-6 h-1 bg-black mb-1"></div>
            <div className="w-6 h-1 bg-black mb-1"></div>
            <div className="w-6 h-1 bg-black"></div>
          </button>
          <h1 className="text-5xl font-bold text-[#7c5e10]">Skill Gap Analysis</h1>
        </div>

        {/* Search Bar */}
        <div className="mt-6 flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for posts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-3/4 py-4 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7c5e10] text-[#121211] text-lg"
          />
        </div>

        {/* Dynamic Sector Title */}
        <h2 className="text-3xl font-bold text-left text-[#7c5e10] mb-4 ml-8">
          {selectedSector === 'Default' ? 'All Jobs' : selectedSector}
        </h2>

        {/* Job Role Buttons */}
        <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto bg-[#f4f4f4] p-12 rounded-lg shadow-xl">
          {filteredJobRoles.length > 0 ? (
            filteredJobRoles.map((role, index) => (
              <div
                key={index}
                className="bg-[#b8c79d] text-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <h2 className="text-2xl font-bold">{role.title}</h2>
                <p className="mt-3 text-lg">{role.description}</p>
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
        <h2 className="text-3xl font-bold text-[#7c5e10] mb-8">Job Sectors</h2>
        {jobSectors.map((sector, index) => (
          <div key={index} className="mb-6">
            <button
              className="w-full text-left bg-[#b8c79d] text-white p-4 rounded-lg font-semibold cursor-pointer hover:bg-[#a3b48a] transition-all duration-300 flex justify-between items-center"
              onClick={() => toggleSectorDropdown(sector.sector)}
            >
              <span>{sector.sector}</span>
              <span className={`text-lg ${expandedSector === sector.sector ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {expandedSector === sector.sector && (
              <div className="mt-2 pl-6">
                {sector.jobs.map((job, idx) => (
                  <button
                    key={idx}
                    className="block text-left text-[#121211] hover:text-[#7c5e10] transition-colors duration-200 mb-2"
                    onClick={() => handleSectorSelect(sector.sector)}
                  >
                    {job}
                  </button>
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
