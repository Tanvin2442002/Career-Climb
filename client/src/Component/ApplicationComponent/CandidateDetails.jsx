import React from "react";

const CandidateDetails = ({ candidate, onClose }) => (
  <div className="p-6 bg-white shadow-xl rounded-lg max-h-[80vh] overflow-y-auto">
    <button className="text-gray-500 hover:text-red-500 text-xl" onClick={onClose}>
      &times;
    </button>
    <h2 className="text-2xl font-bold mt-2">{candidate.name}</h2>
    <p className="text-gray-600">{candidate.role}</p>
    <p className="text-yellow-500 mt-2">⭐ {candidate.rating}</p>
    <h3 className="mt-4 text-lg font-bold"></h3>
    <p className="text-sm text-gray-700">{candidate.bio}</p>
    <div className="flex justify-between mt-4">
      <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
        Reject
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
        Accept
      </button>
    </div>
  </div>
);

export default CandidateDetails;
