import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin} from "@fortawesome/free-solid-svg-icons";
const JobPostCard = ({ job }) => {
  return (
    <div className="hover:bg-green-opacity-20 rounded-lg  p-4 border border-gray-200 flex flex-col justify-between h-full w-full shadow-xl">
      <div className="flex justify-between">
      </div>

      <div className="font-semibold text-sm flex justify-between items-center">
        <div className="flex flex-col">
          <p
            className="bg-blue-50 text-blue-700 hover:bg-blue-100 mx-2 px-2 py-1 rounded"
          >
            {job.role}
          </p>
          <p
            className="bg-green-50 hover:bg-green-100 text-green-700 m-2 px-2 py-1 rounded"
          >
            ${job.salary}
          </p>
        </div>
        <div className="flex px-2 justify-start">
          <FontAwesomeIcon icon={faLocationPin} className="text-gray-500 px-2 mt-[1px]" />
          <span className="text-sm font-medium text-gray-600">{job.location}</span>
        </div>
      </div>
      <div className="mt-2 flex-grow max-h-[100px] overflow-y-auto">
        <p className="text-sm text-gray-700">{job.description}</p>
      </div>
    </div>
  );
};

export default JobPostCard;
