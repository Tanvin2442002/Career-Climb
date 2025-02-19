import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const JobPostCard = ({ job, handleDelete, handleEdit }) => {
  return (
    <div className="w-full bg-green-opacity-10 hover:bg-green-opacity-20 shadow-lg rounded-lg">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center justify-evenly">
          <div className="flex flex-col md:flex-row">
            <motion.p
              whileHover={{ scale: 1.025 }}
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 m-2 px-2 py-1 rounded"
            >
              {job.role}
            </motion.p>
            <motion.p
              whileHover={{ scale: 1.025 }}
              className="bg-green-50 hover:bg-green-100 text-green-700 m-2 px-2 py-1 rounded"
            >
              {job.salary}
            </motion.p>
          </div>
          <p className="text-gray-500 p-3 text-sm">{job.postTime}</p>
        </div>
        <div className="md:flex-row flex-col p-2">
          {/* ✅ Edit Button Opens Modal */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleEdit(job)} // ✅ Properly opens modal
            className="bg-blue-700 text-white w-8 p-1 m-1 rounded-md hover:bg-blue-800"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </motion.button>

          {/* Delete Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleDelete(job.post_id)}
            className="bg-red-500 w-8 text-white p-1 m-1 rounded-md hover:bg-red-700"
          >
            <FontAwesomeIcon icon={faTrash} />
          </motion.button>
        </div>
      </div>

      <p className="p-4 text-gray-700 text-sm">{job.description}</p>
    </div>
  );
};

export default JobPostCard;
