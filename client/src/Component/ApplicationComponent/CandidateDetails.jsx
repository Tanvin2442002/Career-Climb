import React from "react";

const CandidateDetails = ({ candidate, onClose }) => (
  <div className="p-6 bg-white shadow-xl rounded-lg max-h-[80vh] overflow-y-auto ">
    <button
      className=" text-gray-500 hover:text-red-500 text-xl"
      onClick={onClose}
    >
      &times;
    </button>

  <div className="inline-flex items-center justify-between">
     <h2 className="text-2xl font-bold mt-2 ml-5">{candidate.name}</h2>
      <button
        onClick={() => alert(`Viewing CV for ${candidate.name}`)}
        className="bg-gray-500 text-white px-4 py-0 ml-12 mt-2 rounded-lg"
      >
        View CV
      </button>
  </div>
    <p className="text-gray-600">{candidate.role}</p>
    <p className="text-yellow-500 mt-2">⭐ {candidate.rating}</p>

    <h3 className="mt-4 text-lg font-bold">About</h3>
    <p className="text-sm text-gray-700">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

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
