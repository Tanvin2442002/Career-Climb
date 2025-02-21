import { MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Ensure the Navbar component is correctly imported

import { Toaster, toast } from "react-hot-toast";
const url = process.env.REACT_APP_API_URL;

function JobPortal() {
  const [selectedJob, setSelectedJob] = useState(null); // Track the selected job
  const [searchTerm, setSearchTerm] = useState(""); // Track the search term
  const [useruuid, setuuid] = useState("");
  const [cvstat, setcvstat] = useState("");

  const [jobs, setJobPosts] = useState([]);

  // Filter jobs based on the search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = async (uuid) => {
    try {
      const response = await fetch(`${url}/checkcv/${useruuid}`);
      if (!response.ok) {
        toast.error("Failed to check CV");
        return;
      }
      const data = await response.json();

      // Assuming the API response contains the `cv` value to check if CV is uploaded
      if (!data[0].cv) {
        toast.error("Upload CV First", {
          style: {
            backgroundColor: "rgb(195, 232, 195)",
            color: "black",
            fontWeight: "bold",
          },
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const checkApplicationResponse = await fetch(
        `${url}/checkapplication/${useruuid}/${selectedJob.post_id}`
      );
      if (!checkApplicationResponse.ok)
        throw new Error("Failed to check application");

      const applicationData = await checkApplicationResponse.json();

      if (applicationData.alreadyApplied) {
        toast.error("You have already applied for this job.", {
          style: {
            backgroundColor: "rgb(255, 200, 200)",
            color: "black",
            fontWeight: "bold",
          },
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const requestBody = {
        post_id: selectedJob.post_id,
        useruuid: useruuid,
      };
      const r2 = await fetch(`${url}/uploadinfoforjob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const d1 = await r2.json();
      if (r2.ok) {
        toast.success("Applied Successfully", {
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
        });
      }
    } catch (err) {
      console.error("Error Applying", err);
    }
  };

  useEffect(() => {
    const storeduuid = localStorage.getItem("user");
    const parseduser = JSON.parse(storeduuid);

    if (parseduser?.uuid) {
      setuuid(parseduser.uuid);
    } else {
      toast.error("userdata not found");
    }
  }, []);
  useEffect(() => {
    const getallJobs = async () => {
      try {
        const response = await fetch(`${url}/getalljobs`);
        if (!response.ok) {
          toast.error("Failed to fetch jobs");
          return;
        }
        const data = await response.json();

        const result = data.map((job) => ({
          company_logo: job.company_logo,
          post_id: job.post_id,
          role: job.role,
          salary: job.salary,
          description: job.description,
          location: job.location,
          company_name: job.company_name,
          required_skill: job.skill_names,
          post_date: job.post_date,
        }));
        setJobPosts(result);
      } catch (err) {
        console.error("Failed fetching jobs", err);
      }
    };
    getallJobs();
  }, []);


  return (
    <div>
      {/* Navbar Section */}
      <Navbar />
      <Toaster />
      {/* Main Content Section */}
      <div className=" flex ">
        {/* Search Filters Section */}
        {/* Main Content */}
        <div className="flex w-full">
          {/* Job Cards Section */}
          <div className="p-5 border-2 w-full space-y-4">
            {/* Search Bar */}
            <div className="flex justify-center items-center mb-4">
              <div className="justify-center w-2/3 flex h-10 items-center space-x-4">
                <input
                  type="text"
                  placeholder="Search for jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow p-3 border h-10 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Render Filtered Jobs */}
            <div className="max-h-[90vh] overflow-y-auto">
              {filteredJobs.map((job, index) => (
                <>
                  <div
                    key={index}
                    onClick={() => setSelectedJob(job)}
                    className="space-y-4 m-2 border-2 rounded-md flex justify-between p-4 bg-green-opacity-10 hover:bg-green-opacity-20"
                  >
                    <div className="w-1/5  items-start">
                      <img
                        src={job.company_logo}
                        alt="Company logo"
                        className="rounded-md h-32"
                      />
                    </div>

                    <div className="space-y-2 w-1/2">
                      <div className="flex gap-2 text-sm">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {job.role}
                        </span>
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
                          {job.salary}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foregroun py-2">
                        {job.required_skill.map((skill, index) => (
                          <span key={index} className="bg-gray-200 px-2 py-1 rounded mr-2">
                            {skill}
                          </span>
                        ))}

                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex-col w-2/12 h-20 items-center justify-evenly px-2">
                      <span className="text-sm text-muted-foreground">
                        {job.post_date}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>

          {/* Job Details Section */}
          {selectedJob && (
            <div className="w-3/5 border-red-500 p-5 bg-gray-50 rounded-lg sticky max-h-[115vh] overflow-y-auto  shadow-lg">
              <div className=" flex justify-center items-center  py-2">
                <img
                  src={selectedJob.company_logo}
                  alt={`${selectedJob.company_name} logo`}
                  className="flex-grow-12 h-32 mb-2 rounded-lg"
                />
              </div>

              <h2 className="flex justify-center items-center font-bold text-xl mb-4">
                {selectedJob.role}
              </h2>
              <h3 className="flex justify-center items-center font-semibold text-lg mb-2">
                {selectedJob.company_name} , {selectedJob.location}
              </h3>
              <span className="text-bold font-semibold"> Salary:<br />
              </span>
              <span className="bg-green-50 text-green-700 space-y-4">
                ${selectedJob.salary}
              </span>
              <h3 className="text-lg font-bold my-3"> Required Skills </h3>
              {selectedJob.required_skill.map((skill, index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 rounded mr-2">
                  {skill}
                </span>
              ))}

              <h3 className="text-lg font-bold mt-2">About Job </h3>
              <p className="text-gray-700 mt-4">{selectedJob.description}</p>

              {/* Buttons Section */}
              <div className="flex justify-center items-center pb-4 space-x-4">
                <button
                  onClick={handleApply} // Example action for "Apply Now"
                  className=" bg-[#8DAFA8] text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Close Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobPortal;
