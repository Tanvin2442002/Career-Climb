import React from "react";
import { BrowserRouter } from "react-router-dom"; // Ensure the Router context exists
import Navbar from "./Navbar"; // Ensure the Navbar component is correctly imported
import CircularProgress from "@mui/material/CircularProgress";
import { Chart } from "react-google-charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function App() {
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
      title: "Software Engineer, Spotify",
      logo: "https://via.placeholder.com/50", // Replace with actual logo URL
    },
    {
      title: "Software Engineer, Twitter",
      logo: "https://via.placeholder.com/50", // Replace with actual logo URL
    },
    {
      title: "UI Designer, Meta",
      logo: "https://via.placeholder.com/50", // Replace with actual logo URL
    },
  ];

  return (
    <BrowserRouter>
      <div className="bg-[#FFF7EF]">
        {/* Navbar Section */}
        <Navbar />

        {/* Dashboard Header */}
        <div className="mt-10 ml-6 rounded-lg">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-Poppins font-bold tracking-wide">
            Dashboard
          </h1>
        </div>

        {/* Main Content Container */}
        <div className="flex flex-col md:flex-row mt-6 gap-6 justify-center items-start">
          {/* Left Section - User Profile and Progress Bars */}
          <div className="mr-auto w-full md:w-1/3 flex flex-col items-center rounded-md bg-white p-6 min-h-[700px]">
            {/* User Profile Image */}
            <img
              src="https://via.placeholder.com/150"
              alt="User Profile"
              className="w-24 h-24 sm:w-30 sm:h-30 rounded-full mt-5"
            />
            <h1 className="font-Poppins mt-4 font-bold text-lg">Zaima Ahmed</h1>

            {/* Progress Bars Container */}
            <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
              {/* Progress Bar 1 */}
              <div className="relative flex justify-center items-center w-24 h-24 sm:w-32 sm:h-32">
                <CircularProgress
                  value={60}
                  variant="determinate"
                  size={96}
                  thickness={5}
                />
                <div className="absolute flex flex-col justify-center items-center">
                  <h3 className="text-sm sm:text-lg font-bold">PHP</h3>
                  <span className="text-xs sm:text-sm text-gray-600">60%</span>
                </div>
              </div>

              {/* Progress Bar 2 */}
              <div className="relative flex justify-center items-center w-24 h-24 sm:w-32 sm:h-32">
                <CircularProgress
                  value={75}
                  variant="determinate"
                  size={96}
                  thickness={5}
                />
                <div className="absolute flex flex-col justify-center items-center">
                  <h3 className="text-sm sm:text-lg font-bold">JS</h3>
                  <span className="text-xs sm:text-sm text-gray-600">75%</span>
                </div>
              </div>

              {/* Progress Bar 3 */}
              <div className="relative flex justify-center items-center w-24 h-24 sm:w-32 sm:h-32">
                <CircularProgress
                  value={90}
                  variant="determinate"
                  size={96}
                  thickness={5}
                />
                <div className="absolute flex flex-col justify-center items-center">
                  <h3 className="text-sm sm:text-lg font-bold">React</h3>
                  <span className="text-xs sm:text-sm text-gray-600">90%</span>
                </div>
              </div>
            </div>

            {/* Recent Activities Section */}
            <h1 className="font-Poppins text-lg font-bold mt-10">
              Recent Activities
            </h1>
            <div className="w-full flex flex-col gap-4 mt-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="w-full bg-white shadow-md rounded-lg p-4 text-sm text-gray-700"
                >
                  <FontAwesomeIcon icon={faBell} className="mr-2" />
                  {activity}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Google Chart and Saved Jobs */}
          <div className="w-full md:w-2/3 flex flex-col items-center bg-white rounded-md p-6">
            {/* Google Chart */}
            <div className="w-full">
              <Chart
                chartType="LineChart"
                data={interviewData}
                options={chartOptions}
                width={"100%"}
                height={"300px"}
              />
            </div>

            {/* Saved Jobs Section */}
            <div className="mt-10 w-full">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 font-Poppins">
                Your Saved Jobs
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedJobs.map((job, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-between bg-white shadow-md rounded-lg p-6"
                  >
                    <img
                      src={job.logo}
                      alt={job.title}
                      className="w-16 h-16 rounded-full mb-4"
                    />
                    <h2 className="text-center text-lg font-medium mb-4">
                      {job.title}
                    </h2>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-full">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
