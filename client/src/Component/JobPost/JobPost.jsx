import React, { useEffect, useState } from "react";
import JobPostCard from "./JobPostCard";
import PostJobForm from "./JobPostform";
import Navbar from "../Navbar";
import jobPost from "./../../Assets/jobPost.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { parse } from "uuid";
const url = process.env.REACT_APP_API_URL;

const JobPostsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobPosts, setJobPosts] = useState([]);
  const [useruuid, setuuid] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  const filteredJobs = jobPosts.filter((job) =>
    job.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    const storeduuid = localStorage.getItem("user");
    const parseduser = JSON.parse(storeduuid);

    if (parseduser?.uuid) {
      setuuid(parseduser.uuid);
    } else {
      console.log("UUID not found");
    }
  }, []);

  // ✅ Log the updated state when it actually updates
  useEffect(() => {
    if (useruuid) {
      console.log("UUID retrieved:", useruuid);
    }
  }, [useruuid]); // ✅ Runs when `useruuid` changes

  useEffect(() => {
    if (useruuid) {
      const getAllJobs = async () => {
        try {
          console.log("Fetching jobs for UUID:", useruuid);
          const response = await fetch(`${url}/getjobposts?uuid=${useruuid}`);
          if (!response.ok) throw new Error("Failed to fetch job posts");
          const data = await response.json();
          console.log("Fetched Jobs:", data);

          const jobs = data.map((job) => ({
            post_id: job.post_id,
            company_name: job.company_name,
            role: job.role,
            salary: job.salary,
            postTime: job.post_date,
            description: job.description,
            jobType: job.job_type,
            workingHours: job.working_hours,
            location: job.location,
          }));
          setJobPosts(jobs);
        } catch (err) {
          console.error("Failed to fetch the jobs", err);
        }
      };
      getAllJobs();
    }
  }, [useruuid]);
  const handleOpenModal = (job = null) => {
    console.log("JOB DATA ", job);
    setSelectedJob(job); // If editing, pass job details
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleUpdateJobList = (updatedJob) => {
    setJobPosts((prevJobs) =>
      prevJobs.map((job) =>
        job.post_id === updatedJob.post_id ? updatedJob : job
      )
    );
  };

  const handleDelete = async (post_id) => {
    try {
      console.log(post_id);
      const response = await fetch(`${url}/deletejobpost/${post_id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete jobpost");
      setJobPosts((prevJobs) =>
        prevJobs.filter((job) => job.post_id != post_id)
      );
    } catch (err) {
      console.error("Error Deleting the job post", err);
    }
  };
  // const handleEdit = async (post_id, updatedJob) => {
  //   try {
  //     console.log(post_id);
  //     console.log(updatedJob);

  //     const response = await fetch(`${url}/updatejobpost/${post_id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedJob),
  //     });
  //     if (!response.ok) throw new Error("Failed to update the job");
  //     setJobPosts((prevJobs) =>
  //       prevJobs.map((job) =>
  //         job.post_id === post_id ? { ...job, ...updatedJob } : job
  //       )
  //     );
  //   } catch (err) {
  //     console.error("Failed to update the job");
  //   }
  // };
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
              <div className="relative drop-shadow-lg w-3/4">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Search job"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-2 pl-10 rounded-md w-full"
                />
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
                    <JobPostCard
                      job={job}
                      handleDelete={handleDelete}
                      handleEdit={() => handleOpenModal(job)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                scale: 0.5,
                opacity: 0,
                duration: 0.1,
                ease: "easeInOut",
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 rounded-md flex justify-center items-center z-50"
            >
              <div className="bg-white relative rounded-lg w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
                <FontAwesomeIcon
                  icon={faX}
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-red-600 cursor-pointer font-bold text-xl"
                />
                <PostJobForm
                  job={selectedJob} // Pass job data when editing
                  onClose={handleCloseModal}
                  onUpdateJob={handleUpdateJobList} // Update the UI after editing
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JobPostsPage;
