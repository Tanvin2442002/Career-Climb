import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes as faX } from "@fortawesome/free-solid-svg-icons";
const url = process.env.REACT_APP_API_URL;

const PostJobForm = ({ onClose }) => {
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    location: "",
  });
  const [jobInfo, setJobInfo] = useState({
    jobRole: "",
    salary: "",
    jobType: "full-time",
    workingHours: "",
    requiredskills: [],
  });
  const [jobDescription, setJobDescription] = useState("");
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("User Info:", userInfo);
    console.log("Company Info:", companyInfo);
    console.log("Job Info:", jobInfo);
    console.log("Job Description:", jobDescription);

    toast.success("Job Posted Successfully!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    const jobpost = {
      useruuid: useruuid,
      jobRole: jobInfo.jobRole,
      salary: jobInfo.salary,
      jobType: jobInfo.jobType,
      workingHours: jobInfo.workingHours,
      jobDescription: jobDescription,
      location: companyInfo.location,
      requiredskills: jobInfo.requiredskills,
    };
    console.log(jobpost);
    try {
      const response = await fetch(`${url}/jobpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobpost),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Job Post Created", data);
      } else {
        console.error("Not created");
      }
    } catch (err) {
      console.log(err);
    }

    setUserInfo({ name: "", email: "" });
    setCompanyInfo({ companyName: "", location: "" });
    setJobInfo({
      jobRole: "",
      salary: "",
      jobType: "full-time",
      workingHours: "",
      requiredskills: "",
    });
    setJobDescription("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="overflow-x-auto">
        <h2 className="text-2xl font-bold font-Poppins uppercase text-center mb-6">
          Post a Job
        </h2>
        <div className="mb-6 overflow-auto">
          <h3 className="text-xl font-semibold">User Info</h3>
          <div className="">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              className="w-full h-10 p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              className="w-full p-3 h-10 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

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
              value={companyInfo.location}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, location: e.target.value })
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
              className="w-full p-3 h-10 border border-gray-300 rounded-lg"
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
              value={jobInfo.workingHours}
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
              htmlFor="requiredSkills"
              className="block text-gray-700 font-semibold mb-2"
            >
              Required Skills
            </label>
            <select
              id="requiredSkills"
              className="w-full p-3 h-10 border border-gray-300 rounded-lg"
              onChange={(e) => {
                const selectedSkillUUID = e.target.value; // Get the UUID of the selected skill
                console.log("Selected Skill UUID:", e.target.value); // Debugging

                if (
                  selectedSkillUUID &&
                  !jobInfo.requiredskills.includes(selectedSkillUUID) // Avoid duplicates
                ) {
                  setJobInfo({
                    ...jobInfo,
                    requiredskills: [
                      ...jobInfo.requiredskills,
                      selectedSkillUUID,
                    ], // Store UUID in requiredskills array
                  });
                }
              }}
            >
              <option value="">Select Required Skills</option>
              {skills.map((skill) => (
                <option key={skill.uuid} value={skill.uuid}>
                  {skill.name} {/* Display name to the user */}
                </option>
              ))}
            </select>
            console.log(jobInfo.requiredSkills);
            {/* Display selected skills as small grey boxes */}
            {/* Display selected skills as small grey boxes */}
            <div className="flex flex-wrap gap-2 mt-2">
              {jobInfo.requiredskills.map((uuid) => {
                // Find the skill name from the skills array using the UUID
                const skill = skills.find((s) => s.uuid === uuid);
                return (
                  <div
                    key={uuid}
                    className="flex items-center bg-gray-200 px-3 py-1 rounded-lg"
                  >
                    <span className="text-gray-700">
                      {skill?.name || "Unknown Skill"}
                    </span>{" "}
                    {/* Display the name */}
                    <button
                      type="button"
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => {
                        setJobInfo({
                          ...jobInfo,
                          requiredskills: jobInfo.requiredskills.filter(
                            (id) => id !== uuid // Remove the UUID from the array
                          ),
                        });
                      }}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Job Description</h3>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
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
          Post Job
        </button>
      </form>

      <ToastContainer />
    </>
  );
};

export default PostJobForm;