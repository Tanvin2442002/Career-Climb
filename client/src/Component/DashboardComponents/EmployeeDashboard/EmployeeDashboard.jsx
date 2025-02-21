import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure the Router context exists
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../../Navbar"; // Ensure the Navbar component is correctly imported
import Chartdata from "./ChartData";
import LineChart from "./LineChart";


import { toast } from "react-toastify";
import JobPostCard from "./JobCards";
import { ToastError } from "../../../UI/ToastError";
const url = process.env.REACT_APP_API_URL;

function EmployeeDashboard() {
  const [jobs, setjobs] = useState([]);
  const navigate = useNavigate();
  const [recentActivities, setrecentActivities] = useState([]);

  const [savedroles, setSavedRoles] = useState([]);
  const [monthlyjobs, setmonthlyjobs] = useState(Array(12).fill(0));
  const [monthlyAccepted, setmonthlyAccepted] = useState(Array(12).fill(0));
  const [monthlyRejected, setmonthlyRejected] = useState(Array(12).fill(0));
  useEffect(() => {
  }, []);


  useEffect(() => {
    const storeduuid = localStorage.getItem("user");
    const parseduser = JSON.parse(storeduuid);
    const useruuid = parseduser.uuid;
    const getnotification = async () => {
      try {
        const response = await fetch(`${url}/getnotifications?useruuid=${useruuid}`);

        if (!response.ok) {
          ToastError("Failed fetching notificaitons");
        }
        const data = await response.json();
        const result = data.map((notif) => ({
          details: notif.details,
        }));
        setrecentActivities(result);
      } catch (err) {
        ToastError("Failed fetching notificaitons");
      }
    };

    const getsavedroles = async () => {
      try {
        const response = await fetch(`${url}/getsavedroles?useruuid=${useruuid}`);
        if (!response.ok) {
          ToastError("Failed fetching saved roles");
        }
        const data = await response.json();
        const result = data.map((role) => ({
          role_id: role.role_id,
          name: role.name,
          category: role.category,
          description: role.description,
        }));
        setSavedRoles(result);
      } catch (err) {
        ToastError("Failed fetching saved roles");
      }
    };
    const getmonthlyjobs = async () => {
      try {
        const response = await fetch(`${url}/getmonthlyjob?useruuid=${useruuid}`);
        if (!response.ok) {
          ToastError("Failed fetching monthly jobs");
        }
        const data = await response.json();
        const req = Array(12).fill(0);
        data.forEach((item) => {
          const monthid = item.month - 1;
          req[monthid] = item.total_jobs;
        });
        setmonthlyjobs(req);
      } catch (err) {
        ToastError("Failed fetching monthly jobs");
      }
    };
    const getmonthlyaccepted = async () => {
      try {
        const response = await fetch(`${url}/getmonthlyaccepted?useruuid=${useruuid}`);
        if (!response.ok) {
          ToastError("Failed fetching monthly accepted jobs");
        }
        const data = await response.json();
        const req = Array(12).fill(0);
        data.forEach((item) => {
          const monthid = item.month - 1;
          req[monthid] = item.total_accepted;
        });
        setmonthlyAccepted(req);
      } catch (err) {
        ToastError("Failed fetching monthly accepted jobs");
      }
    };
    const getmonthlyrejected = async () => {
      try {
        const response = await fetch(`${url}/getmonthlyrejected?useruuid=${useruuid}`);
        if (!response.ok) {
          ToastError("Failed fetching rejected jobs");
        }
        const data = await response.json();
        const req = Array(12).fill(0);
        data.forEach((item) => {
          const monthid = item.month - 1;
          req[monthid] = item.total_rejected;
        });
        setmonthlyRejected(req);
      } catch (err) {
        ToastError("Failed fetching rejected jobs");
      }
    };
    const getjobs = async () => {
      try {
        const response = await fetch(`${url}/getjobs?useruuid=${useruuid}`);
        if (!response.ok) {
          ToastError("Error in getting jobs");
        }
        const data = await response.json();
        const result = data.map((jobs) => ({
          company_logo: jobs.company_logo,
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
      } catch (err) {
        ToastError("Error in getting jobs");
      }
    };
    getnotification();
    getsavedroles();
    getmonthlyjobs();
    getmonthlyaccepted();
    getmonthlyrejected();
    getjobs();
  }, []);

  return (
    <div className="">
      {/* Navbar Section */}
      <Navbar />
      {/* Main Content Container */}
      <div className="flex flex-col mt-2   gap-6 justify-center items-start">
        {/* Left Section - User Profile and Progress Bars */}
        <div className="sm:flex w-full items-center rounded-m p-6 gap-6">
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
                <h2 className="text-center text-lg font-medium mb-4">
                  {role.name}
                </h2>
                <button
                  onClick={() => {
                    navigate(`/skill-boost/${role.role_id}`);
                  }}

                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
                  View Details
                </button>
              </div>
            ))}
          </div>
          <div className="bg-green-opacity-10 m-5 rounded-lg shadow-md p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recommended Jobs
            </h3>
            <Swiper
              spaceBetween={20}
              slidesPerView={3}
              breakpoints={{
                250: {
                  slidesPreview: 1,
                },
                639: {
                  slidesPreView: 1,
                },
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              navigation
              // pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
            >
              {jobs.map((job, index) => (
                <SwiperSlide key={index} className="flex justify-center p-2">
                  <JobPostCard job={job} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
