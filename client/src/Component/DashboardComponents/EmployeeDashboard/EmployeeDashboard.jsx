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
  const [jobs, setjobs] = useState([]);

  const [recentActivities, setrecentActivities] = useState([]);

  const [savedroles, setSavedRoles] = useState([]);
  const [useruuid, setuuid] = useState("");
  const [monthlyjobs, setmonthlyjobs] = useState(Array(12).fill(0));
  const [monthlyAccepted, setmonthlyAccepted] = useState(Array(12).fill(0));
  const [monthlyRejected, setmonthlyRejected] = useState(Array(12).fill(0));
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

    const getsavedroles = async () => {
      try {
        console.log(useruuid);
        const response = await fetch(`${url}/getsavedroles/${useruuid}`);
        if (!response.ok) console.log("Failed fetching saved roles");
        const data = await response.json();
        console.log(data);
        const result = data.map((role) => ({
          name: role.name,
          category: role.category,
          description: role.description,
        }));
        setSavedRoles(result);
        console.log(result);
      } catch (err) {
        console.error("Error getting saved roles", err);
      }
    };
    getsavedroles();
    const getmonthlyjobs = async () => {
      try {
        console.log(useruuid);
        const response = await fetch(`${url}/getmonthlyjob/${useruuid}`);
        console.log(response);
        if (!response.ok) console.log("Failed in fetching monthly jobs");
        const data = await response.json();
        console.log(data);
        const req = Array(12).fill(0);
        data.forEach((item) => {
          const monthid = item.month - 1;
          req[monthid] = item.total_jobs;
        });
        setmonthlyjobs(req);
        console.log("Monthly applied jobs", monthlyjobs);
      } catch (err) {
        console.error("Error getting monthly jobs", err);
      }
    };
    getmonthlyjobs();
    const getmonthlyaccepted = async () => {
      try {
        console.log(useruuid);
        const response = await fetch(`${url}/getmonthlyaccepted/${useruuid}`);
        console.log(response);
        if (!response.ok) console.log("Failed in fetching monthly accepted");
        const data = await response.json();
        console.log(data);
        const req = Array(12).fill(0);
        data.forEach((item) => {
          const monthid = item.month - 1;
          req[monthid] = item.total_accepted;
        });
        setmonthlyAccepted(req);
        console.log("Monthly accepted", monthlyAccepted);
      } catch (err) {
        console.error("Error getting accepted jobs", err);
      }
    };
    getmonthlyaccepted();
    const getmonthlyrejected = async () => {
      try {
        console.log(useruuid);
        const response = await fetch(`${url}/getmonthlyrejected/${useruuid}`);
        console.log(response);
        if (!response.ok) console.log("Failed in fetching monthly rejected");
        const data = await response.json();
        console.log(data);
        const req = Array(12).fill(0);
        data.forEach((item) => {
          const monthid = item.month - 1;
          req[monthid] = item.total_rejected;
        });
        setmonthlyRejected(req);
        console.log("Monthly rejected", monthlyRejected);
      } catch (err) {
        console.error("Error getting rejected jobs", err);
      }
    };
    getmonthlyrejected();
    const getjobs = async () => {
      try {
        const response = await featch(`${url}/getjobs/${useruuid}`);
        if (!response.ok) console.log("Failed fetching jobs");
        const data = await response.json();
        console.log(data);
        const result = data.map((jobs) => ({
          company_name: jobs.company_name,
          role: jobs.role,
          salary: jobs.salary,
          description: jobs.description,
          location: jobs.location,
          post_date: jobs.post_date,
          job_type: jobs.job_type,
          company_name: jobs.company_name,
        }));
        setjobs(result);
        console.log(result);
      } catch (err) {
        console.error("Error in getting jobs");
      }
    };
    getjobs();
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
      </div>
      <div className="bg-green-opacity-10 rounded-lg shadow-md p-4 border border-gray-200 h-full overflow-hidden">
        <p>Activity Overview</p>
        <div className="w-full h-[300px] lg:h-[400px] pt-4 mb-4">
          <LineChart
            data={Chartdata(monthlyjobs, monthlyAccepted, monthlyRejected)}
          />
        </div>
      </div>

      {/* Right Section - Google Chart and Saved Jobs */}
      <div className="w-full flex flex-col items-center bg-white rounded-md p-6">
        {/* Google Chart */}

        {/* Bookmarked Jobs Section */}
        <div className="mt-2 w-full bg-green-opacity-10 p-5 rounded-md">
          <h1 className="text-lg sm:text-xl text-center font-Bai_Jamjuree uppercase md:text-2xl font-bold mb-4">
            Saved Roles
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {savedroles.map((role, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between bg-white shadow-xl rounded-lg p-4"
              >
                <img
                  src={role.logo}
                  alt={role.name}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <h2 className="text-center text-lg font-medium mb-4">
                  {role.name}
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
            {jobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
