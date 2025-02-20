import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes as faX } from "@fortawesome/free-solid-svg-icons";
const url = process.env.REACT_APP_API_URL;

const PostJobForm = ({ job, onClose, onUpdateJob }) => {
  const [jobInfo, setJobInfo] = useState({
    jobRole: "",
    salary: "",
    jobType: "full-time",
    workingHours: "",
    requiredskills: [],
    location: "",
    description: "",
  });
  //const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [useruuid, setuuid] = useState("");
  useEffect(() => {
    const storeduuid = localStorage.getItem("user");
    const parseduser = JSON.parse(storeduuid);
    console.log(parseduser.uuid);
    if (parseduser.uuid) {
      setuuid(parseduser.uuid);
      console.log("UUID retrieved", parseduser.uuid);
    } else {
      console.log("UUID not found");
    }
  }, []);

  useEffect(() => {
    const getallskills = async (e) => {
      try {
        const response = await fetch(`${url}/skills`);
        if (!response.ok) throw new Error("Failed to fetch skills");
        const data = await response.json();
        console.log(data);
        const skillNames = data.map((skill) => ({
          uuid: skill.skill_id,
          name: skill.name,
        }));
        console.log("Mapped skills", skillNames);
        setSkills(skillNames);
        console.log(skills);
      } catch (error) {
        console.error("Error fetching skills", error);
      }
    };
    getallskills();
  }, []);
  useEffect(() => {
    if (job) {
      console.log("Loading existing job data:", job); // Debugging
      console.log("Required skills before mapping: ", job.requiredskills);

      setJobInfo({
        jobRole: job.role || "",
        salary: job.salary || "",
        jobType: job.job_type || "full-time",
        workingHours: job.workingHours || "",
        requiredskills:
          job.requiredskills?.map((skillUUID) => {
            const matchedSkill = skills.find((s) => s.uuid === skillUUID);
            return matchedSkill
              ? { uuid: matchedSkill.uuid, name: matchedSkill.name }
              : { uuid: skillUUID, name: "Unknown Skill" };
          }) || [],
        jobDescription: job.description || "",
        location: job.location || "",
      });
    }
  }, [job, skills]); // ✅ Also watch `skills` since it's used inside the mapping

  // 🔥 Log jobInfo **AFTER** it updates
  useEffect(() => {
    console.log("Updated jobInfo:", jobInfo);
  }, [jobInfo]); // ✅ Runs every time jobInfo changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobPostData = {
      useruuid,
      jobRole: jobInfo.jobRole,
      salary: jobInfo.salary,
      jobType: jobInfo.jobType,
      workingHours: jobInfo.workingHours,
      jobDescription: jobInfo.jobDescription,
      location: jobInfo.location,
      requiredskills: jobInfo.requiredskills.map((skill) => skill.uuid),
    };

    console.log("Form submit ", jobPostData);
    try {
      let response;
      if (job.post_id) {
        console.log(job.post_id);
        const post_id = job.post_id;
        console.log(post_id);
        console.log(jobPostData);
        // ✅ Editing an existing job (PUT request)
        response = await fetch(`${url}/updatejobpost/${post_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobPostData),
        });
      } else {
        // ✅ Creating a new job (POST request)
        response = await fetch(`${url}/jobpost`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobPostData),
        });
      }

      if (!response.ok) throw new Error("Failed to save job post");

      toast.success(
        job.post_id ? "Job Updated Successfully!" : "Job Posted Successfully!",
        {
          position: "bottom-center",
          autoClose: 2000,
          style: {
            backgroundColor: "rgb(195, 232, 195)", // Sets background to green
            color: "black", // Sets text color to white
            fontWeight: "bold",
          },
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      if (job.post_id) {
        onUpdateJob({ ...job, ...jobPostData });
      }
      onClose(); // ✅ Close modal after success
    } catch (err) {
      console.error("Error saving job post", err);
      toast.error("Failed to save job post.");
    }
  };

  // Add a new state variable for the search query
  const [skillSearch, setSkillSearch] = useState("");

  // Function to handle selecting a skill from search results
  const handleSkillSelect = (selectedSkill) => {
    if (!jobInfo.requiredskills.some((s) => s.uuid === selectedSkill.uuid)) {
      setJobInfo({
        ...jobInfo,
        requiredskills: [...jobInfo.requiredskills, selectedSkill],
      });
    }
    setSkillSearch(""); // Optionally clear search after selection
  };

  // Filter skills based on the search query
  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(skillSearch.toLowerCase())
  );


  return (
    <>
      <form onSubmit={handleSubmit} className="overflow-x-auto">
        <h2 className="text-2xl font-bold font-Poppins uppercase text-center mb-6">
          {job.post_id ? "Edit Job Post" : "Post a Job"}
        </h2>

        <div className="mb-2">
          <h3 className="text-xl font-semibold mb-2">Company Details</h3>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 font-semibold mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              defaultValue={jobInfo.location}
              onChange={(e) =>
                setJobInfo({ ...jobInfo, location: e.target.value })
              }
              className="w-full p-3 h-10 border border-gray-300 rounded-lg"
              placeholder="Enter location"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Job Info</h3>
          <div className="mb-4">
            <label
              htmlFor="jobRole"
              className="block text-gray-700 font-semibold mb-2"
            >
              Job Role
            </label>
            {job.post_id ? (
              <input
                type="text"
                id="jobRole"
                value={jobInfo.jobRole}
                disabled
                className="w-full p-3 h-10 border border-gray-300 rounded-lg"
              />
            ) : (
              <input
                type="text"
                id="jobRole"
                value={jobInfo.jobRole}
                onChange={(e) =>
                  setJobInfo({ ...jobInfo, jobRole: e.target.value })
                }
                className="w-full p-3 h-10 border border-gray-300 rounded-lg"
                placeholder="Enter job role"
                required
              />
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="salary"
              className="block text-gray-700 font-semibold mb-2"
            >
              Salary
            </label>
            <input
              type="text"
              id="salary"
              value={jobInfo.salary}
              onChange={(e) =>
                setJobInfo({ ...jobInfo, salary: e.target.value })
              }
              className="w-full p-3 h-10 border border-gray-300 rounded-lg"
              placeholder="Enter salary range"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="jobType"
              className="block text-gray-700 font-semibold mb-2"
            >
              Job Type
            </label>
            <select
              id="jobType"
              value={jobInfo.jobType}
              onChange={(e) =>
                setJobInfo({ ...jobInfo, jobType: e.target.value })
              }
              className="w-full px-3 h-10 border border-gray-300 rounded-lg"
              required
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="intern">Intern</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="workingHours"
              className="block text-gray-700 font-semibold mb-2"
            >
              Working Hours
            </label>
            <input
              type="text"
              id="workingHours"
              defaultValue={jobInfo.workingHours}
              onChange={(e) =>
                setJobInfo({ ...jobInfo, workingHours: e.target.value })
              }
              className="w-full p-3 h-10 border border-gray-300 rounded-lg"
              placeholder="Enter working hours"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="skillSearch"
              className="block text-gray-700 font-semibold mb-2"
            >
              Select required skills
            </label>
            <input
              type="text"
              id="skillSearch"
              placeholder="Search for skills..."
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              className="w-full p-3 h-10 border border-gray-300 rounded-lg"
            />
            {/* Display search results */}
            {skillSearch && filteredSkills.length > 0 && (
              <ul className="bg-white border border-gray-300 rounded-lg mt-2 max-h-48 overflow-auto">
                {filteredSkills.map((skill) => (
                  <li
                    key={skill.uuid}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSkillSelect(skill)}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            )}
            {skillSearch && filteredSkills.length === 0 && (
              <p className="mt-2 text-gray-500">No skills found</p>
            )}
          </div>

          {/* Display selected skills */}
          <div className="flex flex-wrap gap-2 mt-2">
            {jobInfo.requiredskills.map((skill) => (
              <div
                key={skill.uuid}
                className="flex items-center bg-gray-200 px-3 py-1 rounded-lg"
              >
                <span className="text-gray-700">
                  {skill.name || "Unknown Skill"}
                </span>
                <button
                  type="button"
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() =>
                    setJobInfo({
                      ...jobInfo,
                      requiredskills: jobInfo.requiredskills.filter(
                        (s) => s.uuid !== skill.uuid
                      ),
                    })
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Job Description</h3>
          <textarea
            id="jobDescription"
            value={jobInfo.jobDescription}
            onChange={(e) =>
              setJobInfo({ ...jobInfo, jobDescription: e.target.value })
            }
            className="w-full p-3 h-24 border border-gray-300 rounded-lg"
            rows="6"
            placeholder="Enter job description"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {job.post_id ? "Update Job" : "Post Job"}
        </button>
      </form>

      <ToastContainer />
    </>
  );
};

export default PostJobForm;