import React from "react";
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


const Dashboard = () => {
  const data = {
    profilePic: Zaima,
    userName: "Zaima Ahmed",
    progressData: [
      { percentage: 80, label: "Applications" },
      { percentage: 65, label: "Job Posts" },
      { percentage: 90, label: "Active Recruiter" },
    ],
    activities: [
      {
        title: "New Applicant",
        description: "You have a new applicant for your job post.",
        icon: check,
      },
      {
        title: "New Badge Unlocked",
        description: "Earned the 'Top Recruiter' badge.",
        icon: check,
      },
      {
        title: "New Applicant",
        description: "You have a new applicant for your job post.",
        icon: check,
      },
      {
        title: "Level Up!",
        description: "You've reached level 5 in 'Job Offerer'.",
        icon: check,
      },
    ],
  };

  const jobs = [
    {
      company: "Kite Games",
      role: "Frontend Developer",
      salary: "$60,000 - $80,000 / yr",
      description: "Build responsive web applications using React and Tailwind CSS.",
      logo: Kite,
      location: "Dhaka, Bangladesh",
    },
    {
      company: "Kite Games",
      role: "Backend Engineer",
      salary: "$70,000 - $90,000 / yr",
      description: "Develop and maintain server-side applications using Node.js and Express.",
      logo: Kite,
      location: "Dhaka, Bangladesh",
    },
    {
      company: "Kite Games",
      role: "UI/UX Designer",
      salary: "$50,000 - $75,000 / yr",
      description: "Design user-friendly interfaces and ensure seamless user experiences.",
      logo: Kite,
      location: "Dhaka, Bangladesh",
    },
    {
      company: "Kite Games",
      role: "Cybersecurity Analyst",
      salary: "$80,000 - $110,000 / yr",
      description: "Monitor and protect systems against security breaches and vulnerabilities.",
      logo: Kite,
      location: "Dhaka, Bangladesh",
    },
    {
      company: "Kit Games",
      role: "Data Scientist",
      salary: "$85,000 - $120,000 / yr",
      description: "Analyze complex datasets and provide actionable business insights.",
      logo: Kite,
      location: "Dhaka, Bangladesh",
    },
    {
      company: "Kite Games",
      role: "DevOps Engineer",
      salary: "$75,000 - $95,000 / yr",
      description: "Automate and manage cloud-based infrastructure and CI/CD pipelines.",
      logo: Kite,
      location: "Dhanmondi, Bangladesh",
    },
  ];

  return (
    <div>
      <Navbar />
      <div>
        <CardDisplay />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="lg:w-1/4 flex-shrink-0">
          <VerticalCard
            profilePic={data.profilePic}
            userName={data.userName}
            progressData={data.progressData}
            activities={data.activities}
          />
        </div>

        <div className="lg:w-3/4 flex flex-col gap-4">
          <div className="bg-green-opacity-10 rounded-lg shadow-md p-4 border border-gray-200 h-full overflow-hidden">
            <p>Activity Overview</p>
            <div className="w-full h-[300px] lg:h-[400px] pt-4 mb-4">
              <LineChart data={Chartdata} />
            </div>
          </div>

          <div className="bg-green-opacity-10 rounded-lg shadow-md p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Job Posts</h3>
            <Swiper
              spaceBetween={20}
              slidesPerView={3}
              breakpoints={{
                250:{
                  slidesPreview:1,
                },
                639:{
                  slidesPreView:1,
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
