import React from "react";
import ifrit from "../../Assets/ifrit.jpg";
import { motion, AnimatePresence } from "framer-motion";

import { useInView } from 'react-intersection-observer';


const CandidateCard = ({ candidate, onSelect, id }) => {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
      transition={{ duration: 0.5, delay: id * 0.1, ease: 'backInOut' }}
      className="p-4 bg-white shadow-xl rounded-lg flex flex-col sm:flex-row gap-4 cursor-pointer hover:bg-gray-100"
      onClick={() => onSelect(candidate)}
    >
      <div className="flex-shrink-0 mx-auto sm:mx-0">
        <img
          src={candidate.profile_pic}
          alt={candidate.name}
          className="w-20 h-20 rounded-full"
        />
      </div>
      <div className="flex flex-col justify-center flex-grow text-center sm:text-left">
        <h3 className="text-lg font-bold">{candidate.employee_name}</h3>
        <p className="text-sm text-gray-600">{candidate.role}</p>
        <p className="text-sm font-bold">Expected Salary: {candidate.salary}</p>

        <p className="text-sm text-gray-500">
          {candidate.type === "full-time" ? "Full-Time" : "Intern"}
        </p>

        <p className="text-sm text-gray-500">
          Applied on: {candidate.application_date}
        </p>
      </div>

      <button className="self-center mt-2 sm:mt-0 mx-auto sm:mx-0">&gt;&gt;</button>
    </motion.div>
  );
};
export default CandidateCard;
