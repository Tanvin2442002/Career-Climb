import React, { use, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import check from "../../../Assets/accept.png";
import Kite from "../../../Assets/LogoKite.png";
import Zaima from "../../../Assets/zaima.jpg";
import Navbar from "../../Navbar";
import CardDisplay from "./CardsDisplay";
import Chartdata from "./ChartData";
import JobPostCard from "./JobCards";
import LineChart from "./LineChart";
import VerticalCard from "./ProfileProgress";
const url = process.env.REACT_APP_API_URL;

const Dashboard = () => {
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
        console.log(useruuid);
        const response = await fetch(
          `${url}/getnotificationsforemployee/${useruuid}`
        );

        if (!response.ok) console.log("Failed fetching notifications");
        const data = await response.json();
        console.log(data);
        const result = data.map((notif) => ({
          details: notif.details,
        }));
        console.log(result);
        setnotifications(result);
      } catch (err) {
        console.error("Failed fetching notificaitons", err);
      }
    };
    getnotification();
    const getmonthlyjobs = async () => {
      try {
        console.log(useruuid);
        const response = await fetch(`${url}/getjobcount/${useruuid}`);
        if (!response.ok) console.log("Failed in fetching jobs");

        const data = await response.json();
        console.log("Monthly job posts:", data);
        const jobData = Array(12).fill(0);
        data.forEach((item) => {
          const monthid = item.month - 1;
          jobData[monthid] = item.total_jobs;
        });
        setmonthlyjobs(jobData);
      } catch (err) {
        console.log("Failed in fetching jobs", err);
      }
    };
    getmonthlyjobs();
    const getmonthlyapplicants = async () => {
      try {
        console.log(useruuid);
        const response = await fetch(`${url}/getapplicantcount/${useruuid}`);
        if (!response.ok) console.log("Failed in fetching apps");

        const data = await response.json();
        console.log("Monthly job posts:", data);
        const appData = Array(12).fill(0);
        data.forEach((item) => {
          const monthid = item.month - 1;
          appData[monthid] = item.total_applicants;
        });
        setmonthlyapplicants(appData);
      } catch (err) {
        console.log("Failed in fetching jobs", err);
      }
    };
    getmonthlyapplicants();
    const getmonthlyrecruits = async () => {
      try {
        console.log(useruuid);
        const response = await fetch(`${url}/getrecruitcount/${useruuid}`);
        if (!response.ok) console.log("Failed in fetching recruits");

        const data = await response.json();
        console.log("Monthly recruits:", data);
        const reqData = Array(12).fill(0);
        data.forEach((item) => {
          const monthid = item.month - 1;
          reqData[monthid] = item.total_recruits;
        });
        console.log(reqData);
        setmonthlyrecruits(reqData);
        console.log("Recruits: ", monthlyrecruits);
      } catch (err) {
        console.log("Failed in fetching recruits", err);
      }
    };
    getmonthlyrecruits();
    const getuserdata = async () => {
      try {
        console.log(useruuid);
        const response = await fetch(`${url}/getuserdata/${useruuid}`);
        if (!response.ok) console.log("Failed in fetching userdata");
        const data = await response.json();
        console.log(data);
        const result = data.map((user) => ({
          name: user.name,
          profile_pic: user.profile_pic,
        }));
        console.log(result);
        setuserdata(result);
      } catch (err) {
        console.log("Failed in fetching user data");
      }
    };
    getuserdata();
    const getjobs = async () => {
      try {
        console.log(useruuid);
        const response = await fetch(`${url}/getalljobs/${useruuid}`);
        if (!response.ok) console.log("Failed in fetching jobs");
        const data = await response.json();
        console.log(data);
        const result = data.map((job) => ({
          company_name: job.company_name,
          role: job.role,
          salary: job.salary,
          location: job.location,
          description: job.description,
          company_logo: job.company_logo,
        }));
        setjobs(result);
        console.log(jobs);
      } catch (err) {
        console.log("Failed in fetching jobs");
      }
    };
    getjobs();
    const getapplicants = async () => {
      try {
        console.log(useruuid);
        const response = await fetch(`${url}/getapplicants/${useruuid}`);
        if (!response.ok) console.log("Failed in getting number of applicants");
        const data = await response.json();

        console.log(data);
        const result = data.map((app) => ({
          count: app.count,
        }));
        setapplicants(result);
      } catch (err) {
        console.log("Failed in getting number of applicants");
      }
    };
    getapplicants();
    const getrecruited = async () => {
      try {
        console.log(useruuid);
        const response = await fetch(`${url}/getrecruited/${useruuid}`);
        if (!response.ok) console.log("Failed in getting number of recruited");
        const data = await response.json();

        console.log(data);
        const result = data.map((app) => ({
          count: app.count,
        }));
        setrecruited(result);
      } catch (err) {
        console.log("Failed in getting number of applicants");
      }
    };
    getrecruited();
  }, [useruuid]);

  const notificationlength = notifications.length;
  console.log(notificationlength);
  return (
    <div>
      <Navbar />
      <div>
        <CardDisplay
          notificationlength={notificationlength}
          applicants={applicants}
          recruited={recruited}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="lg:w-1/4 flex-shrink-0">
          <VerticalCard
            profile_pic={userdata.profile_pic}
            name={userdata.name}
            details={notifications}
          />
        </div>

        <div className="lg:w-3/4 flex flex-col gap-4">
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
