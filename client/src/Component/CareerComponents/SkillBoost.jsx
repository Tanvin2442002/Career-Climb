import React, { useState } from 'react';
import Navbar from '../Navbar';
import Light from '../../Assets/Light.svg';
import Skill1 from '../../Assets/skill1.svg';

const SkillBoost = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select a job role to compare your skills");
  //const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="p-6 flex flex-col items-center justify-center bg-[#fffff] h-screen relative">
        <div className="absolute top-5 left-5">
          <img src={Light} alt="Light Bulb" className="w-13" />
        </div>
        <h1 className="text-4xl font-bold text-[#7c5e10]">Skill Boost</h1>
        <p className="text-lg mt-2 text-center text-[#7c5e10]">
          Compare your current skills with job requirements and find ways to grow!
        </p>
        <div className="mt-6 flex flex-col items-center w-full">
          <div className="relative w-2/3">
            <div
              className={`p-7 w-full border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7c5e10] text-[#fffff] text-lg bg-white cursor-pointer transition duration-300 ${showOptions ? 'hover:bg-[#f9e8d6]' : 'hover:shadow-xl scale-105'}`}
              style={{ backgroundColor: "#b8c79d", marginTop: "10px", position: "relative" }}
              onClick={() => setShowOptions(!showOptions)}
            >
              {selectedOption}
              <span className="absolute right-8 top-7 text-[#121211]">▼</span>
            </div>
            {showOptions && (
              <ul className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
                <li className="p-3 hover:bg-[#d8dece] text-[#7c5e10] cursor-pointer" onClick={() => { setSelectedOption("Frontend Developer"); setShowOptions(false); }}>Frontend Developer</li>
                <li className="p-3 hover:bg-[#d8dece] text-[#7c5e10] cursor-pointer" onClick={() => { setSelectedOption("Backend Developer"); setShowOptions(false); }}>Backend Developer</li>
                <li className="p-3 hover:bg-[#d8dece] text-[#7c5e10] cursor-pointer" onClick={() => { setSelectedOption("Fullstack Developer"); setShowOptions(false); }}>Fullstack Developer</li>
              </ul>
            )}
          </div>
          <button
            className="mt-6 px-12 py-5 bg-[#b07b3a] text-white font-semibold text-lg rounded-lg shadow-2xl hover:bg-[#9c6d34] hover:scale-110 transition-transform duration-300"
           // onClick={() => navigate('/SkillBoostTable')} // Navigate to SkillBoostTable
          >
            Enter
          </button>
        </div>
        <div className="absolute bottom-10 right-7 p-12">
          <img
            src={Skill1}
            alt="Skill Illustration"
            className="w-[500%] h-[300%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SkillBoost;