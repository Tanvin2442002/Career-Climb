import React from "react";
import ifrit from "../../Assets/ifrit.jpg";

const CandidateCard = ({ candidate, onSelect }) => (
  <div
    className="p-4 bg-white shadow-xl rounded-lg flex flex-col sm:flex-row gap-4 cursor-pointer hover:bg-gray-100"
    onClick={() => onSelect(candidate)}
  >
    {/* Image */}
    <div className="flex-shrink-0 mx-auto sm:mx-0">
      <img
        src={ifrit}
        alt={candidate.name}
        className="w-20 h-20 rounded-full"
      />
    </div>

    {/* Candidate Info (Centered on smaller screens, left-aligned on larger screens) */}
    <div className="flex flex-col justify-center flex-grow text-center sm:text-left">
      <h3 className="text-lg font-bold">{candidate.name}</h3>
      <p className="text-sm text-gray-600">{candidate.role}</p>
      <p className="text-sm font-bold">Expected Salary: {candidate.salary}</p>

      <p className="text-sm text-gray-500">
        {candidate.type === "full-time" ? "Full-Time" : "Intern"}
      </p>

      <p className="text-sm text-gray-500">
        Applied on: {new Date(candidate.appliedDate).toLocaleDateString()}
      </p>
    </div>

    {/* Button */}
    <button className="self-center mt-2 sm:mt-0 mx-auto sm:mx-0">&gt;&gt;</button>
  </div>
);

export default CandidateCard;
