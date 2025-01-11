import React from "react";

const JobPostCard = ({ job, handleDelete }) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center p-4">
        <span className="font-bold text-lg">{job.companyName}</span>
        <div className="space-x-2">
          <button className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
            Edit
          </button>
          <button className="px-4 py-2 text-white bg-red-500 rounded-full hover:bg-black"
          >
            delete
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
        <p className="text-gray-600 text-sm">{job.salary}</p>
        <p className="text-gray-500 text-sm">{job.postTime}</p>
      </div>
      <p className="p-4 text-gray-700 text-sm">{job.description}</p>
    </div>
  );
};

export default JobPostCard;
