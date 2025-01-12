import React, { useState } from "react";
import JobPostCard from "./JobPostCard";
import PostJobForm from "./JobPostform";
import Navbar from "../Navbar";
import jobPost from './../../Assets/jobPost.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const JobPostsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [jobPosts, setJobPosts] = useState([
    {
      companyName: "Microsoft",
      jobTitle: "Software Engineer",
      salary: "$5k-$7k",
      postTime: "12 hours ago",
      description: "Software engineers are responsible for developing, testing, deploying, and revamping computer programs. They are responsible for writing code, designing software, and debugging software applications. Software engineers work with a range of programming languages, such as C++, Java, and Python.",
    },
    {
      companyName: "Google",
      jobTitle: "Frontend Developer",
      salary: "$4k-$6k",
      postTime: "1 day ago",
      description: "Front-end developers are responsible for creating the visual elements that users see and interact with in a web application. They are responsible for designing and developing the user interface of a web application, including the layout, navigation, and interactive elements. Front-end developers work with a range of technologies, such as HTML, CSS, and JavaScript.",
    },
    {
      companyName: "Amazon",
      jobTitle: "Backend Developer",
      salary: "$6k-$8k",
      postTime: "2 days ago",
      description: "Back-end developers are responsible for creating the server-side logic of a web application. They are responsible for writing code that runs on the server and interacts with the database, as well as handling user authentication and authorization. Back-end developers work with a range of technologies, such as Node.js, Express, and MongoDB.",
    },
    {
      companyName: "Facebook",
      jobTitle: "Data Scientist",
      salary: "$5k-$7k",
      postTime: "3 days ago",
      description: "Data scientists are responsible for analyzing and interpreting complex data sets to help organizations make informed business decisions. They are responsible for collecting, cleaning, and analyzing data, as well as developing statistical models and machine learning algorithms. Data scientists work with a range of tools and technologies, such as Python, R, and SQL.",
    },
  ]);

  const handleDelete = (jobTitle) => {
    setJobPosts(jobPosts.filter((job) => job.jobTitle !== jobTitle));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredJobs = jobPosts.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-2">
        <div className="flex w-full">
                <div className="hidden md:flex w-2/5 items-center justify-center p-6">
                <img src={jobPost} alt="jobPost" className="w-full h-auto" />
                </div>

                {/* Right Column */}
          <div className="w-full md:w-3/5 flex flex-col items-center justify-center p-2 -mt-8">
            {/* Search Bar */}
            <div className="w-11/12 md:w-full  flex justify-evenly items-center mb-4">
              <div
                className="relative drop-shadow-lg w-3/4"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text" placeholder="Search job"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-2 pl-10 rounded-md w-full" />
                <button className="absolute right-0 hover:scale-105 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300 text-sm sm:text-base">
                  Search
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}

                onClick={handleOpenModal}
                className="px-6 bg-blue-500 h-10 text-white rounded-lg hover:bg-blue-600 ml-auto block"
              >
                Post a Job
              </motion.button>
            </div>
            <div className="w-full">
              <div className="h-[80vh] max-w-4xl space-y-8 overflow-y-auto">
                {filteredJobs.map((job, index) => (
                  <div key={index} className="w-full">
                    <JobPostCard job={job} handleDelete={handleDelete} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{scale: 0.5, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              exit={{scale: 0.5, opacity: 0, duration: 0.1, ease: "easeInOut"}}
              transition={{duration: 0.2, ease: "easeInOut"}}
            className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 rounded-md flex justify-center items-center z-50">
              <div className="bg-white relative rounded-lg w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
                <FontAwesomeIcon icon={faX}
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-red-600 cursor-pointer font-bold text-xl" />
                <PostJobForm onClose={handleCloseModal} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JobPostsPage;
