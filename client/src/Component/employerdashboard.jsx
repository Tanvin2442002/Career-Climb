import React, { useState } from "react";
import Navbar from "./Navbar";
import { MapPin } from "lucide-react";

function EmployerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      date: "10 Dec, 2025",
      description:
        "Join our team as a Software Engineer and lead our digital outreach efforts.",
      post: "Software Engineer",
      salary: "60k-70k",
      jobtype: "Remote",
      location: "Dhaka Bangladesh",
      applied: "20",
      status: "Ongoing",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      date: "10 Dec, 2025",
      description:
        "Join our team as a QA Engineer and lead our digital outreach efforts.",
      post: "QA Engineer",
      salary: "40k-70k",
      jobtype: "Remote",
      location: "Dhaka Bangladesh",
      applied: "50",
      status: "Ongoing",
    },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  const filteredJobs = jobs.filter(
    (job) =>
      job.post.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.salary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openPopup = (job) => {
    setCurrentJob(job);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentJob(null);
  };

  const handleSave = () => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job === currentJob ? currentJob : job))
    );
    closePopup();
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center mt-5">
        <h1 className="font-Poppins text-4xl font-bold tracking-wider">
          Dashboard
        </h1>
      </div>
      <div className="flex justify-center items-center mb-4">
        <div className="mt-4 justify-center w-2/3 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <h1 className="font-bold font-Poppins text-lg">Current Job Postings</h1>
      </div>

      {filteredJobs.map((job, index) => (
        <div className="space-y-4">
          <div
            key={index}
            className="bg-green-opacity-10 hover:bg-green-opacity-20 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-10 w-10 relative">
                  <img
                    src={job.logo}
                    alt="Company logo"
                    className="object-contain rounded-md h-full w-full"
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {job.date}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{job.post}</h3>
                <div className="flex gap-2 text-sm">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    {job.jobtype}
                  </span>
                  <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
                    {job.salary}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {job.description}
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-end">
                <button className=" bg-[#8DAFA8] text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                  Check All Applicants
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => openPopup(job)}
                  className="bg-[#8DAFA8] text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Job Post</h2>
            <div className="mb-4">
              <label className="block font-semibold">Job Title</label>
              <input
                type="text"
                value={currentJob?.post}
                onChange={(e) =>
                  setCurrentJob({ ...currentJob, post: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Salary</label>
              <input
                type="text"
                value={currentJob?.salary}
                onChange={(e) =>
                  setCurrentJob({ ...currentJob, salary: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Location</label>
              <input
                type="text"
                value={currentJob?.location}
                onChange={(e) =>
                  setCurrentJob({ ...currentJob, location: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closePopup}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployerDashboard;
