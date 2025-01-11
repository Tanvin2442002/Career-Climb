import React from "react";
import ImageCard from "./TopCards";
import Bell from "../../Assets/bell.png";
import recruit from "../../Assets/search-user.png";
import Post from "../../Assets/sticky-notes.png";
import form from "../../Assets/form.png";

const CardDisplay = () => {
  const data = [
    {
      imageSrc: recruit,
      title: "Total Recruitment",
      description: "You have recruited 4 people this month.",
      altText: "Profile icon",
    },
    {
      imageSrc: Post,
      title: "Job Posts",
      description: "320 job posts created this month.",
      altText: "Job post icon",
    },
    {
      imageSrc: form,
      title: "New Applications",
      description: "You received 85 new job applications.",
      altText: "Applications icon",
    },
    {
      imageSrc: Bell,
      title: "Notifications Received",
      description: "You have 45 unread Notifications.",
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
