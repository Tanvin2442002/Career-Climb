import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom"; // Ensure the Router context exists
import Navbar from "../../Navbar"; // Ensure the Navbar component is correctly imported
import CircularProgress from "@mui/material/CircularProgress";
import { Chart } from "react-google-charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import LineChart from "./LineChart";
import Chartdata from "./ChartData";

import Logo from "./google.svg";

import JobCard from "../../LandingComponents/JobCard";
const url = process.env.REACT_APP_API_URL;

function EmployeeDashboard() {
  const JOBS = [
    {
      logo: Logo,
      date: "8 DEC, 2023",
      title: "Software Engineer",
      type: "FULL TIME",
      salary: "$10K-$15K",
      location: "London, United Kingdom",
      description:
        "Join our team as an Email Marketing Specialist and lead our digital outreach efforts.",
    },
    {
      logo: Logo,
      date: "8 DEC, 2023",
      title: "Data Analyst",
      type: "FULL TIME",
      salary: "$10K-$15K",
      location: "London, United Kingdom",
      description:
        "Join our team as an Email Marketing Specialist and lead our digital outreach efforts.",
    },
    {
      logo: Logo,
      date: "8 DEC, 2023",
      title: "Lead Product Designer",
      type: "FULL TIME",
      salary: "$10K-$15K",
      location: "London, United Kingdom",
      description:
        "Join our team as an Email Marketing Specialist and lead our digital outreach efforts.",
    },
    {
      logo: Logo,
      date: "8 DEC, 2023",
      title: "Full-Stack Developer",
      type: "FULL TIME",
      salary: "$10K-$15K",
      location: "London, United Kingdom",
      description:
        "Join our team as an Email Marketing Specialist and lead our digital outreach efforts.",
    },
    {
      logo: Logo,
      date: "8 DEC, 2023",
      title: "UX Designer/Researcher",
      type: "FULL TIME",
      salary: "$10K-$15K",
      location: "London, United Kingdom",
      description:
        "Join our team as an Email Marketing Specialist and lead our digital outreach efforts.",
    },
    {
      logo: Logo,
      date: "8 DEC, 2023",
      title: "Software Engineer",
      type: "FULL TIME",
      salary: "$10K-$15K",
      location: "London, United Kingdom",
      description:
        "Join our team as an Email Marketing Specialist and lead our digital outreach efforts.",
    },
  ];

  const [recentActivities, setrecentActivities] = useState([]);

  const savedJobs = [
    {
      title: "Software Engineer, Google",
      logo: Logo,
    },
    {
      title: "Research Scientist, Google",
      logo: Logo,
    },
    {
      title: "UI Designer, Google",
      logo: Logo,
    },
    {
      title: "Data Analyst, Google",
      logo: Logo,
    },
    {
      title: "Product Manager, Google",
      logo: Logo,
    },
  ];
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
    const getnotification = async () => {
      try {
        console.log(useruuid);
        const response = await fetch(`${url}/getnotifications/${useruuid}`);

        if (!response.ok) console.log("Failed fetching notifications");
        const data = await response.json();
        console.log(data);
        const result = data.map((notif) => ({
          details: notif.details,
        }));
        console.log(result);
        setrecentActivities(result);
      } catch (err) {
        console.error("Failed fetching notificaitons", err);
      }
    };
    getnotification();
  }, [useruuid]);

  return (
    <div className="">
      {/* Navbar Section */}
      <Navbar />
      {/* Main Content Container */}
      <div className="flex flex-col mt-2   gap-6 justify-center items-start">
        {/* Left Section - User Profile and Progress Bars */}
        <div className="sm:flex w-full items-center rounded-m p-6 gap-6">
          {/* User Profile Image 
          {/* <img
            src="https://via.placeholder.com/150"
            alt="User Profile"
            className="w-24 h-24 sm:w-30 sm:h-30 rounded-full mt-5"
          />
          <h1 className="font-Poppins mt-4 font-bold text-lg">Zaima Ahmed</h1> */}

          {/* Recent Activities Section */}
          <h1 className="font-Bai_Jamjuree text-center text-lg font-bold mt-0">
            Recent Activities
          </h1>
          <div className="w-full flex flex-col gap-4 px-10">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="w-full bg-white shadow-md rounded-lg p-4 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faBell} className="mr-2" />
                {activity.details}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-green-opacity-10 rounded-lg shadow-md p-4 border border-gray-200 h-full overflow-hidden max-w-7xl mx-auto">
          <p className="text-lg font-semibold">Activity Overview</p>
          <div className="w-full h-[300px] lg:h-[400px] pt-4 mb-4">
            <LineChart data={Chartdata} />
          </div>
        </div>{" "}
      </div>

      {/* Right Section - Google Chart and Saved Jobs */}
      <div className="w-full flex flex-col items-center bg-white rounded-md p-6">
        {/* Google Chart */}

        {/* Bookmarked Jobs Section */}
        <div className="mt-2 w-full bg-green-opacity-10 p-5 rounded-md">
          <h1 className="text-lg sm:text-xl text-center font-Bai_Jamjuree uppercase md:text-2xl font-bold mb-4">
            Bookmarked Jobs
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {savedJobs.map((job, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between bg-white shadow-xl rounded-lg p-4"
              >
                <img
                  src={job.logo}
                  alt={job.title}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <h2 className="text-center text-lg font-medium mb-4">
                  {job.title}
                </h2>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-lg text-center sm:text-xl uppercase mt-4 md:text-2xl font-bold mb-4 font-Bai_Jamjuree">
            Recomended jobs
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {JOBS.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
