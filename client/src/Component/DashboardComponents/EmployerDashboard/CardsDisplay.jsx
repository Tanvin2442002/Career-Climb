import React, { useEffect, useState } from "react";
import ImageCard from "./TopCards";
import Bell from "../../../Assets/bell.png";
import recruit from "../../../Assets/search-user.png";
import Post from "../../../Assets/sticky-notes.png";
import form from "../../../Assets/form.png";

const url = process.env.REACT_APP_API_URL;

const CardDisplay = () => {

  const [notificationlength, setnotificationlength] = useState(0);
  const [applicants, setapplicants] = useState(0);
  const [recruited, setrecruited] = useState(0);
  const [jobs, setjobs] = useState(0);

  useEffect(() => { 
      const localData = JSON.parse(localStorage.getItem("user"));
      const useruuid = localData.uuid;
      const fetchDetails = async () => {
        try {
          const response = await fetch(
            `${url}/get-everything?user_id=${useruuid}`
          );
          if (!response.ok) console.log("Failed fetching notifications");
          const data = await response.json();
          setnotificationlength(data.notification);
          setapplicants(data.applicants);
          setrecruited(data.recruited);
          setjobs(data.jobs);
        } catch (err) {
          console.error("Failed fetching notifications", err);
        }
      };
      fetchDetails();

  }, [notificationlength, applicants, recruited, jobs]);

  const data = [
    {
      imageSrc: recruit,
      title: "Total Recruitment",
      description: `You have recruited ${recruited} people this month.`,
      altText: "Profile icon",
    },
    {
      imageSrc: Post,
      title: "Job Posts",
      description: `${jobs} job posts created this month.`,
      altText: "Job post icon",
    },
    {
      imageSrc: form,
      title: "New Applications",
      description: `You received ${applicants} new job applications.`,
      altText: "Applications icon",
    },
    {
      imageSrc: Bell,
      title: "Notifications Received",
      description: `You have ${notificationlength} unread Notifications.`,
      altText: "Notifications icon",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {data.map((item, index) => (
        <ImageCard
          key={index}
          imageSrc={item.imageSrc}
          title={item.title}
          description={item.description}
          altText={item.altText}
        />
      ))}
    </div>
  );
};

export default CardDisplay;
