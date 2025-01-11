import React from "react";

const JobPostCard = ({ job }) => {
  return (
    <div className="hover:bg-green-opacity-20 rounded-lg  p-4 border border-gray-200 flex flex-col justify-between h-full w-full shadow-xl">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{job.company}</h3>
        </div>
        <div className="w-12 h-12">
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className="object-contain w-full h-full rounded-md"
          />
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-md font-medium text-blue-600">{job.role}</h4>
        <p className="text-sm text-gray-600">Salary: {job.salary}</p>
      </div>
      <div className="mt-2 flex-grow">
        <p className="text-sm text-gray-700">{job.description}</p>
      </div>
      <div className="flex justify-end mt-4">
        <span className="text-sm font-medium text-gray-600">{job.location}</span>
      </div>
    </div>
  );
};

export default JobPostCard;
