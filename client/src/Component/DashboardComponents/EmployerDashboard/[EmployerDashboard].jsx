import React, { use, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../../Navbar";
import CardDisplay from "./CardsDisplay";
import Chartdata from "./ChartData";
import JobPostCard from "./JobCards";
import LineChart from "./LineChart";
import { toast } from "react-toastify";
import { ToastError } from "../../../UI/ToastError";
const url = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [useruuid, setuuid] = useState("");
  useEffect(() => {
    const storeduuid = localStorage.getItem("user");
    const parseduser = JSON.parse(storeduuid);
    if (parseduser.uuid) {
      setuuid(parseduser.uuid);
    } else {
    }
  }, []);
  const [userdata, setuserdata] = useState({ name: "", profile_pic: "" });
  const [notifications, setnotifications] = useState([]); // profilepic, username
  const [jobs, setjobs] = useState([]); // companyname, role, salary, logo, description, location
  const [applicants, setapplicants] = useState();
  const [recruited, setrecruited] = useState();
  const [monthlyjobs, setmonthlyjobs] = useState(Array(12).fill(0));
  const [monthlyapplicants, setmonthlyapplicants] = useState(Array(12).fill(0));
  const [monthlyrecruits, setmonthlyrecruits] = useState(Array(12).fill(0));
  useEffect(() => {
    const getnotification = async () => {
      try {
        const response = await fetch(
          `${url}/getnotificationsforemployee/${useruuid}`
        );

        if (!response.ok) {
          ToastError("Failed fetching notificaitons");
          return;
        }
        const data = await response.json();
        const result = data.map((notif) => ({
          details: notif.details,
        }));
        setnotifications(result);
      } catch (err) {
        ToastError("Failed fetching notificaitons");
      }
    };
    getnotification();
    const getmonthlyjobs = async () => {
      try {
        const response = await fetch(`${url}/getjobcount/${useruuid}`);
        if (!response.ok) {
          ToastError("Failed fetching jobs");
          return;
        }
        const data = await response.json();
        const jobData = Array(12).fill(0);
        data.forEach((item) => {
          const monthid = item.month - 1;
          jobData[monthid] = item.total_jobs;
        });
        setmonthlyjobs(jobData);
      } catch (err) {
        ToastError("Failed fetching jobs");
      }
    };
    getmonthlyjobs();
    const getmonthlyapplicants = async () => {
      try {
        const response = await fetch(`${url}/getapplicantcount/${useruuid}`);
        if (!response.ok) {
          ToastError("Failed fetching applicants");
          return;
        }
        const data = await response.json();
        const appData = Array(12).fill(0);
        data.forEach((item) => {
          const monthid = item.month - 1;
          appData[monthid] = item.total_applicants;
        });
        setmonthlyapplicants(appData);
      } catch (err) {
        ToastError("Failed fetching applicants");
      }
    };
    getmonthlyapplicants();
    const getmonthlyrecruits = async () => {
      try {
        const response = await fetch(`${url}/getrecruitcount/${useruuid}`);
        if (!response.ok) {
          ToastError("Failed fetching recruits");
          return;
        }
        const data = await response.json();
        const reqData = Array(12).fill(0);
        data.forEach((item) => {
          const monthid = item.month - 1;
          reqData[monthid] = item.total_recruits;
        });
        setmonthlyrecruits(reqData);
      } catch (err) {
        ToastError("Failed fetching recruits");
      }
    };
    getmonthlyrecruits();
    const getuserdata = async () => {
      try {
        const response = await fetch(`${url}/getuserdata/${useruuid}`);
        if (!response.ok) {
          ToastError("Failed fetching user data");
          return;
        }
        const data = await response.json();
        const result = data.map((user) => ({
          name: user.name,
          profile_pic: user.profile_pic,
        }));
        setuserdata(result);
      } catch (err) {
        ToastError("Failed fetching user data");
      }
    };
    getuserdata();
    const getjobs = async () => {
      try {
        const response = await fetch(`${url}/get-all-jobs/${useruuid}`);
        if (!response.ok) {
          ToastError("Failed fetching jobs");
          return;
        }
        const data = await response.json();
        const result = data.map((job) => ({
          company_logo: job.company_logo,
          company_name: job.company_name,
          role: job.role,
          salary: job.salary,
          location: job.location,
          description: job.description,
          company_logo: job.company_logo,
        }));
        setjobs(result);
      } catch (err) {
        ToastError("Failed fetching jobs");
      }
    };
    getjobs();
    const getapplicants = async () => {
      try {
        const response = await fetch(`${url}/getapplicants/${useruuid}`);
        if (!response.ok) {
          ToastError("Failed fetching applicants");
          return;
        }
        const data = await response.json();

        const result = data[0].count;
        setapplicants(result);
      } catch (err) {
        ToastError("Failed fetching applicants");
      }
    };
    getapplicants();
    const getrecruited = async () => {
      try {
        const response = await fetch(`${url}/getrecruited/${useruuid}`);
        if (!response.ok) {
          ToastError("Failed fetching recruited");
          return;
        }
        const data = await response.json();

        const result = data[0].count;
        setrecruited(result);
      } catch (err) {
        ToastError("Failed fetching recruited");
      }
    };
    getrecruited();
  }, [useruuid]);

  const notificationlength = notifications.length;
  const jobpost = jobs.length;
  return (
    <div>
      <Navbar />
      <div>
        <CardDisplay
          notificationlength={notificationlength}
          applicants={applicants}
          recruited={recruited}
          jobpost={jobpost}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="lg:w-full flex flex-col gap-4">
          <div className="bg-green-opacity-10 rounded-lg shadow-md p-4 border border-gray-200 h-full overflow-hidden">
            <p>Activity Overview</p>
            <div className="w-full h-[300px] lg:h-[400px] pt-4 mb-4">
              <LineChart
                data={Chartdata(
                  monthlyjobs,
                  monthlyapplicants,
                  monthlyrecruits
                )}
              />
            </div>
          </div>

          <div className="bg-green-opacity-10 rounded-lg shadow-md p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Your Job Posts
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
};

export default Dashboard;
