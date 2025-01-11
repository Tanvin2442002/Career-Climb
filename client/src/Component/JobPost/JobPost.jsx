import React, { useState } from "react";
import JobPostCard from "./JobPostCard";
import PostJobForm from "./JobPostform";
import Navbar from "../Navbar";

const JobPostsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [jobPosts, setJobPosts] = useState([
    {
      companyName: "Microsoft",
      jobTitle: "Software Engineer",
      salary: "$5k-$7k",
      postTime: "12 hours ago",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      companyName: "Google",
      jobTitle: "Frontend Developer",
      salary: "$4k-$6k",
      postTime: "1 day ago",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      companyName: "Amazon",
      jobTitle: "Backend Developer",
      salary: "$6k-$8k",
      postTime: "2 days ago",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      companyName: "Facebook",
      jobTitle: "Data Scientist",
      salary: "$5k-$7k",
      postTime: "3 days ago",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        {/* Search Bar */}
        <div className="w-full max-w-md mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search job roles..."
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Spacing Column */}
          <div className="lg:col-span-1"></div>

          {/* Job Posts Section */}
          <div className="lg:col-span-3 w-full px-6 lg:px-16">
            <button
              onClick={handleOpenModal}
              className="mb-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-auto block"
            >
              Post a Job
            </button>
            <div className="w-full max-w-4xl space-y-8 overflow-y-auto">
              {filteredJobs.map((job, index) => (
                <div key={index} className="w-full">
                  <JobPostCard job={job} handleDelete={handleDelete} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Spacing Column */}
          <div className="lg:col-span-1"></div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={handleCloseModal}
                className="absolute top-10 right-20 text-red-600 font-bold text-xl"
              >
                &times;
              </button>

              <PostJobForm onClose={handleCloseModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPostsPage;
