import React from "react";
import { BrowserRouter } from "react-router-dom"; // Ensure the Router context exists
import Navbar from "./Navbar"; // Ensure the Navbar component is correctly imported
import CircularProgress from "@mui/material/CircularProgress";
import { Chart } from "react-google-charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import Logo from '../Assets/google.svg';

import JobCard from "./LandingComponents/JobCard";

function EmployeeDashboard() {

  const JOBS = [
    {
      logo: Logo,
      date: '8 DEC, 2023',
      title: 'Software Engineer',
      type: 'FULL TIME',
      salary: '$10K-$15K',
      location: 'London, United Kingdom',
      description: 'Join our team as an Email Marketing Specialist and lead our digital outreach efforts.',
    },
    {
      logo: Logo,
      date: '8 DEC, 2023',
      title: 'Data Analyst',
      type: 'FULL TIME',
      salary: '$10K-$15K',
      location: 'London, United Kingdom',
      description: 'Join our team as an Email Marketing Specialist and lead our digital outreach efforts.',
    },
    {
      logo: Logo,
      date: '8 DEC, 2023',
      title: 'Lead Product Designer',
      type: 'FULL TIME',
      salary: '$10K-$15K',
      location: 'London, United Kingdom',
      description: 'Join our team as an Email Marketing Specialist and lead our digital outreach efforts.',
    },
    {
      logo: Logo,
      date: '8 DEC, 2023',
      title: 'Full-Stack Developer',
      type: 'FULL TIME',
      salary: '$10K-$15K',
      location: 'London, United Kingdom',
      description: 'Join our team as an Email Marketing Specialist and lead our digital outreach efforts.',
    },
    {
      logo: Logo,
      date: '8 DEC, 2023',
      title: 'UX Designer/Researcher',
      type: 'FULL TIME',
      salary: '$10K-$15K',
      location: 'London, United Kingdom',
      description: 'Join our team as an Email Marketing Specialist and lead our digital outreach efforts.',
    },
    {
      logo: Logo,
      date: '8 DEC, 2023',
      title: 'Software Engineer',
      type: 'FULL TIME',
      salary: '$10K-$15K',
      location: 'London, United Kingdom',
      description: 'Join our team as an Email Marketing Specialist and lead our digital outreach efforts.',
    },
  ]

  const interviewData = [
    ["Status", "Count"], // Column headings
    ["Accepted", 15],
    ["Rejected", 5],
    ["Shortlisted", 8],
  ];

  const chartOptions = {
    title: "Interview Statistics",
    legend: { position: "bottom" }, // Places legend at the bottom
    hAxis: { title: "Status" },
    vAxis: { title: "Count" },
    colors: ["#4caf50", "#f44336", "#ff9800"], // Custom colors for segments
  };

  const recentActivities = [
    "You have been accepted by Meta",
    "Your application to Google has been shortlisted",
    "You have been rejected by Amazon",
  ];

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
      logo: Logo
    },
    {
      title: "Data Analyst, Google",
      logo: Logo
    },
    {
      title: "Product Manager, Google",
      logo: Logo
    }
  ];

  const ProgressBarData = [
    {
      title: "JS",
      value: 75,
    },
    {
      title: "React",
      value: 90,
    },
    {
      title: "Python",
      value: 80,
    },
    {
      title: "Java",
      value: 70,
    },
    {
      title: "C++",
      value: 65,
    },
  ];

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

          {/* Progress Bars Container */}
          <div className="flex flex-col gap-6 w-full mt-6 ">
            <div className="flex flex-wrap justify-center items-center gap-2 mt-0">
              {ProgressBarData.map((data, index) => (
                <div
                  key={index}
                  className="relative flex justify-center items-center w-20 h-20 sm:w-32 sm:h-32"
                >
                  <CircularProgress
                    value={data.value}
                    variant="determinate"
                    size={96}
                    thickness={5}
                  />
                  <div className="absolute flex flex-col justify-center items-center">
                    <h3 className="text-sm sm:text-lg font-bold">{data.title}</h3>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {data.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

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
                  {activity}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full mt-6">
            <Chart
              chartType="LineChart"
              data={interviewData}
              options={chartOptions}
              width={"100%"}
              height={"400px"}
            />
          </div>
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
    </div>
  );
}

export default EmployeeDashboard;
