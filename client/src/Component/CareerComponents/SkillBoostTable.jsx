import React from 'react';
import skill1 from '../../Assets/skill1.svg';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';


const SkillBoostPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f9f9f9] overflow-y-scroll">
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

        <div className="mt-12 flex justify-between items-start gap-8">
          {/* Skill Table */}
          
          <div className="w-3/5 rounded-lg overflow-hidden shadow-lg mt-6">
  <table className="table-auto w-full border-collapse text-left">
    <thead>
      <tr className="bg-[#9DBAAD] text-black">
        <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Skill</th>
        <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Required Level</th>
        <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Current Status</th>
        <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-gradient-to-r from-[#E6F2E5] via-[#DCECE2] to-[#D2E8D8] hover:bg-gradient-to-r hover:from-[#D2E8D8] hover:via-[#C8E3CF] hover:to-[#BEE0C6]">
        <td className="py-4 px-6 border border-[#B9D7B8]">Programming in Python</td>
        <td className="py-4 px-6 border border-[#B9D7B8]">Proficient</td>
        <td className="py-4 px-6 border border-[#B9D7B8]">Intermediate</td>
        <td className="py-4 px-6 border border-[#B9D7B8] text-[#007BFF] cursor-pointer hover:text-[#0056b3]">
          Complete advanced Python projects or courses
        </td>
      </tr>
      <tr className="bg-gradient-to-r from-[#E6F2E5] via-[#DCECE2] to-[#D2E8D8] hover:bg-gradient-to-r hover:from-[#D2E8D8] hover:via-[#C8E3CF] hover:to-[#BEE0C6]">
        <td className="py-4 px-6 border border-[#B9D7B8]">Version Control (Git)</td>
        <td className="py-4 px-6 border border-[#B9D7B8]">Strong</td>
        <td className="py-4 px-6 border border-[#B9D7B8]">Basic</td>
        <td className="py-4 px-6 border border-[#B9D7B8] text-[#007BFF] cursor-pointer hover:text-[#0056b3]">
          Contribute to open-source projects
        </td>
      </tr>
      <tr className="bg-gradient-to-r from-[#E6F2E5] via-[#DCECE2] to-[#D2E8D8] hover:bg-gradient-to-r hover:from-[#D2E8D8] hover:via-[#C8E3CF] hover:to-[#BEE0C6]">
        <td className="py-4 px-6 border border-[#B9D7B8]">Data Structures & Algorithms</td>
        <td className="py-4 px-6 border border-[#B9D7B8]">Strong</td>
        <td className="py-4 px-6 border border-[#B9D7B8]">Missing</td>
        <td className="py-4 px-6 border border-[#B9D7B8] text-[#007BFF] cursor-pointer hover:text-[#0056b3]">
          Enroll in a DSA-focused program
        </td>
      </tr>
      <tr className="bg-gradient-to-r from-[#E6F2E5] via-[#DCECE2] to-[#D2E8D8] hover:bg-gradient-to-r hover:from-[#D2E8D8] hover:via-[#C8E3CF] hover:to-[#BEE0C6]">
        <td className="py-4 px-6 border border-[#B9D7B8]">Problem Solving</td>
        <td className="py-4 px-6 border border-[#B9D7B8]">Strong</td>
        <td className="py-4 px-6 border border-[#B9D7B8]">Developing</td>
        <td className="py-4 px-6 border border-[#B9D7B8] text-[#007BFF] cursor-pointer hover:text-[#0056b3]">
          Solve coding challenges on platforms like LeetCode or HackerRank
        </td>
      </tr>
    </tbody>
  </table>
</div>


          {/* Skill Image */}
          <div className="w-2/5 flex justify-center items-center">
            <img src={skill1} alt="Skill Boost" className="w-full max-w-lg" />
          </div>
        </div>

        {/* "Want to see the Road Map" Section */}
        <div className="text-left mt-6">
          <button
          onClick={() => navigate('/CareerRoadMap')}
            className="text-[#704F2A] text-lg hover:underline hover:text-[#5A3C1B] transition-all duration-300"
          >
            Want to see the Road Map to this post?
          </button>
        </div>

        {/* People Also Search For */}
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
