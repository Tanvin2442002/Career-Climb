import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom"; // Ensure the Router context exists
import Navbar from "./Navbar"; // Ensure the Navbar component is correctly imported
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faShieldAlt,
  faChartBar,
  faPenNib,
  faLaptopCode,
  faBug,
  faCube,
  faRobot,
  faServer,
  faFlask,
  faGamepad,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

function JobPortal() {
  const [selectedJob, setSelectedJob] = useState(null); // Track the selected job
  const [searchTerm, setSearchTerm] = useState(""); // Track the search term

  const jobs = [
    {
      company: "Samsung",
      role: "Product Manager",
      location: "California, USA",
      salary: "$220k/year",
      applied: "10",
      details: "Manage product life cycles and develop cutting-edge solutions.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
      minimumQualification:
        "Bachelor's degree in Business, Marketing, or related field.",
      preferredQualification:
        "MBA with 5+ years of product management experience.",
      aboutJob:
        "As a Product Manager at Samsung, you will play a pivotal role in the product lifecycle, driving innovation and delivering exceptional solutions that resonate with our customers. You will collaborate with cross-functional teams, including engineering, marketing, and design, to define product requirements and ensure successful execution. Your responsibilities include conducting market research, analyzing competitive trends, and identifying customer needs to shape the product roadmap. You will be the champion of the product vision and work tirelessly to align stakeholders on strategic goals. At Samsung, we value a forward-thinking approach, and you will have the opportunity to explore emerging technologies and implement them into groundbreaking products. The ideal candidate will be adept at managing multiple priorities in a fast-paced environment, have excellent communication skills, and possess a strong business acumen. With a strong emphasis on customer-centricity, you will drive initiatives that deliver meaningful impact and position Samsung as a leader in the industry. This role offers a chance to innovate, lead, and shape the future of technology while working with one of the most recognized global brands. If you are passionate about technology and enjoy working in a dynamic environment, we invite you to join our team and make an impact that matters.",
    },
    {
      company: "Google",
      role: "UX Designer",
      location: "Seattle, USA",
      salary: "$220k/year",
      applied: "15",
      details: "Design intuitive user experiences for Google's core products.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      minimumQualification:
        "Bachelor's degree in Design, Human-Computer Interaction, or related field.",
      preferredQualification:
        "Master's degree with experience in user research and prototyping.",
      aboutJob:
        "As a UX Designer at Google, you will have the opportunity to shape the future of user experiences for millions of people worldwide. You will work on creating seamless, intuitive, and delightful interfaces for our core products, ensuring they meet the needs of a diverse global audience. Your role will involve close collaboration with product managers, engineers, and user researchers to translate complex ideas into clear, functional designs. You'll use your creativity and technical skills to create wireframes, prototypes, and high-fidelity visuals that align with Google's design standards and accessibility guidelines. A significant aspect of this role is conducting user testing and gathering feedback to refine your designs and improve usability. At Google, we value innovation and diversity, and you will be encouraged to bring your unique perspective to the team. This role offers an exciting chance to work with cutting-edge technologies and tools while contributing to products that touch billions of lives. Ideal candidates will have a strong portfolio showcasing their ability to design for both web and mobile platforms, along with excellent communication and problem-solving skills. If you are passionate about making technology accessible and enjoyable for everyone, we want you to join our team and help us design the future.",
    },
    {
      company: "Twitter",
      role: "UX Designer",
      location: "Shanghai, China",
      salary: "$120k/year",
      applied: "5",
      details:
        "Collaborate with teams to create engaging designs for Twitter users.",
      logo: "https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
      minimumQualification: "Bachelor's degree in Design or related field.",
      preferredQualification:
        "2+ years of experience in UX design for web and mobile applications.",
      aboutJob:
        "As a UX Designer at Twitter, your mission will be to enhance the user experience for one of the world’s most dynamic social media platforms. In this role, you will collaborate with cross-functional teams, including developers, researchers, and product managers, to design features that foster meaningful interactions between users. You will create wireframes, mockups, and prototypes that reflect Twitter's unique brand identity and user-centric values. A significant part of your job will be gathering user feedback through testing and research to identify pain points and areas for improvement. Your designs will focus on accessibility, inclusivity, and usability to ensure that the platform remains engaging and intuitive for users across the globe. Working in Twitter’s Shanghai office, you will also have the unique opportunity to tailor designs that resonate with the local audience while aligning with global standards. The ideal candidate will be highly creative, detail-oriented, and proactive in finding innovative solutions to complex problems. If you are passionate about design, thrive in a collaborative environment, and are eager to leave your mark on a platform that connects millions of users daily, we would love to have you on our team.",
    },
    {
      company: "Amazon",
      role: "Software Engineer",
      location: "New York, USA",
      salary: "$150k/year",
      applied: "20",
      details: "Develop scalable software solutions for Amazon's services.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      minimumQualification:
        "Bachelor's degree in Computer Science or related field.",
      preferredQualification: "Experience with distributed systems and AWS.",
      aboutJob:
        "As a Software Engineer at Amazon, you will be at the forefront of building scalable and efficient software solutions that power one of the world's largest e-commerce platforms. You will work with a diverse team of engineers, designers, and product managers to deliver innovative solutions that improve user experience and operational efficiency. Your responsibilities will include designing, developing, testing, and deploying software systems that handle massive amounts of data and traffic. At Amazon, we prioritize customer satisfaction, and you will play a crucial role in implementing features that meet and exceed customer expectations. This role also involves maintaining high standards of code quality and participating in peer code reviews to foster a culture of technical excellence. The ideal candidate will have a strong understanding of algorithms, data structures, and distributed systems, along with experience in modern programming languages such as Java, Python, or C++. As part of the Amazon team, you will have access to cutting-edge tools and resources that enable you to grow professionally and make a significant impact on a global scale. If you are passionate about solving complex challenges and thrive in a fast-paced environment, we invite you to join us in shaping the future of technology.",
    },
    {
      company: "Meta",
      role: "Data Scientist",
      location: "San Francisco, USA",
      salary: "$200k/year",
      applied: "25",
      details:
        "Analyze large datasets to optimize Meta's advertising platform.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.svg",
      minimumQualification:
        "Bachelor's degree in Data Science, Statistics, or related field.",
      preferredQualification:
        "Master's degree with experience in machine learning and data visualization.",
      aboutJob:
        "As a Data Scientist at Meta, you will dive into the world of big data to uncover insights that drive Meta’s advertising platform's success. You will work closely with engineers, product managers, and marketing teams to analyze user behavior, optimize algorithms, and identify growth opportunities. This role involves developing predictive models, designing experiments, and providing actionable recommendations based on your findings. At Meta, innovation is key, and you will have access to cutting-edge tools and resources to solve complex challenges. Ideal candidates will have a strong foundation in statistical analysis, programming experience in Python or R, and a passion for working with large datasets. If you are eager to make an impact at the intersection of technology and analytics, this role offers an excellent platform to do so while being part of one of the most influential companies globally.",
    },
    {
      company: "Apple",
      role: "Hardware Engineer",
      location: "Cupertino, USA",
      salary: "$250k/year",
      applied: "18",
      details: "Design cutting-edge hardware for Apple's flagship products.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      minimumQualification:
        "Bachelor's degree in Electrical or Mechanical Engineering.",
      preferredQualification:
        "Experience with consumer electronics hardware design.",
      aboutJob:
        "As a Hardware Engineer at Apple, you will play a critical role in designing and engineering the hardware components that power Apple’s iconic products. From initial concept to final production, you will collaborate with cross-functional teams to deliver hardware solutions that meet the highest standards of quality and performance. You will work on designing and testing circuit boards, optimizing power efficiency, and ensuring seamless integration with software systems. This role also involves keeping up with emerging technologies and integrating them into innovative product designs. Ideal candidates are detail-oriented, have hands-on experience with hardware development tools, and are passionate about delivering excellence in every aspect of their work. If you want to contribute to cutting-edge technology and be part of a company known for its innovation, this is your opportunity to make a difference.",
    },
    {
      company: "Spotify",
      role: "Product Manager",
      location: "Stockholm, Sweden",
      salary: "$180k/year",
      applied: "8",
      details: "Lead product development for Spotify's streaming platform.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
      minimumQualification:
        "Bachelor's degree in Business, Marketing, or related field.",
      preferredQualification: "Experience in the music or streaming industry.",
      aboutJob:
        "As a Product Manager at Spotify, you will lead the charge in developing features that elevate the music streaming experience for millions of users. Your role will include defining product vision, prioritizing development efforts, and collaborating with engineers and designers to bring ideas to life. You’ll use data and user feedback to refine product strategies and ensure Spotify remains the leader in the music streaming space. This position is ideal for someone with a deep understanding of user behavior, excellent communication skills, and a passion for music and technology. If you thrive in a fast-paced, creative environment and want to shape the future of music streaming, Spotify is the place for you.",
    },
    {
      company: "Netflix",
      role: "Creative Producer",
      location: "Los Angeles, USA",
      salary: "$230k/year",
      applied: "12",
      details: "Oversee creative projects for Netflix's original content.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      minimumQualification:
        "Bachelor's degree in Media, Communications, or related field.",
      preferredQualification:
        "Experience in managing creative projects for film or television.",
      aboutJob:
        "As a Creative Producer at Netflix, you will oversee the end-to-end production of original content that captivates audiences worldwide. You will work with directors, writers, and production teams to bring stories to life, ensuring creative excellence and timely delivery. This role requires balancing artistic vision with budget constraints, collaborating with marketing teams, and ensuring all projects align with Netflix’s brand and quality standards. Ideal candidates have a track record of successful creative projects, excellent leadership skills, and a deep understanding of storytelling. If you are passionate about creating impactful content and want to contribute to a platform that defines entertainment, this is your chance to shine.",
    },
    {
      company: "Tesla",
      role: "Mechanical Engineer",
      location: "Austin, USA",
      salary: "$210k/year",
      applied: "22",
      details: "Design and optimize mechanical systems for Tesla's vehicles.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
      minimumQualification:
        "Bachelor's degree in Mechanical Engineering or related field.",
      preferredQualification: "Experience in the automotive industry.",
      aboutJob:
        "As a Mechanical Engineer at Tesla, you will be instrumental in designing the mechanical systems that power Tesla’s groundbreaking electric vehicles. From developing new components to optimizing manufacturing processes, you will work on projects that push the boundaries of automotive technology. You will collaborate with a team of engineers, researchers, and designers to ensure every Tesla vehicle meets the highest standards of quality, efficiency, and sustainability. Ideal candidates have a strong background in mechanical systems, hands-on prototyping experience, and a passion for advancing green technologies. If you are eager to innovate and contribute to a sustainable future, Tesla offers an unparalleled platform to make an impact.",
    },
    {
      company: "Microsoft",
      role: "Cloud Architect",
      location: "Redmond, USA",
      salary: "$240k/year",
      applied: "30",
      details: "Develop cloud solutions for Microsoft's Azure platform.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      minimumQualification:
        "Bachelor's degree in Computer Science or related field.",
      preferredQualification:
        "Experience in cloud architecture and Microsoft Azure.",
      aboutJob:
        "As a Cloud Architect at Microsoft, you will design and implement cutting-edge cloud solutions that power businesses around the world. Your work will focus on Microsoft Azure, crafting scalable and secure architectures that meet diverse client needs. You will collaborate with developers, IT teams, and stakeholders to translate requirements into robust solutions. This role involves staying ahead of industry trends, mentoring junior engineers, and contributing to Microsoft's reputation as a leader in cloud computing. If you thrive on solving complex technical challenges and want to make a difference at a global scale, this is the opportunity for you.",
    },
    {
      company: "Adobe",
      role: "UI Designer",
      location: "San Jose, USA",
      salary: "$190k/year",
      applied: "7",
      details: "Create intuitive user interfaces for Adobe's creative tools.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Adobe_Corporate_logo.svg",
      minimumQualification:
        "Bachelor's degree in Design, Computer Science, or related field.",
      preferredQualification:
        "Experience in UI design for creative or productivity tools.",
      aboutJob:
        "As a UI Designer at Adobe, you will craft elegant and intuitive user interfaces for our suite of creative tools, used by millions of professionals worldwide. Your role will involve creating wireframes, prototypes, and final designs that enhance usability and aesthetics. You’ll collaborate closely with engineers and product teams to ensure a seamless integration of design and functionality. Adobe values creativity and innovation, so you will have the freedom to experiment and push the boundaries of design. If you are passionate about delivering exceptional user experiences and want to contribute to tools that empower creators, Adobe is the perfect place for you.",
    },
  ];

  // Filter jobs based on the search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
      <div>
        {/* Navbar Section */}
        <Navbar />

        {/* Main Content Section */}
        <div className=" flex ">
          {/* Search Filters Section */}
        <div className="rounded-r-md w-[12%] flex-col justify-center p-4 bg-[#9DBAAD] sticky top-0 h-screen">
            <h3 className=" font-Bai_Jamjuree text-center font-bold text-2xl mb-4 pt-4 text-black">
              Job Type
            </h3>
            <ul className="font-Poppins space-y-2 text-black">
              {[
                "Remote",
                "Full-time",
                "Freelance",
                "Part-time",
                "Internship",
              ].map((type) => (
                <li key={type}>
                  <input type="checkbox" id={type} className="mr-2" />
                  <label htmlFor={type}>{type}</label>
                </li>
              ))}
            </ul>
            <h3 className="font-Poppins font-semibold text-2xl mb-4 space-y-4 pt-4 text-white">
              Company
            </h3>
            <ul className="font-Poppins space-y-2 text-white">
              {["Google", "Amazon", "Spotify", "Shopify", "Meta"].map(
                (type) => (
                  <li key={type}>
                    <input type="checkbox" id={type} className="mr-2" />
                    <label htmlFor={type}>{type}</label>
                  </li>
                )
              )}
            </ul>
            <h3 className="font-Poppins font-semibold text-2xl mb-4 space-y-4 pt-4 text-white">
              Salary
            </h3>
            <ul className="font-Poppins space-y-2 text-white">
              {[
                "50k-60k",
                "70k-100k",
                "100k-120k",
                "120k-140k",
                "140k-200k",
              ].map((type) => (
                <li key={type}>
                  <input type="checkbox" id={type} className="mr-2" />
                  <label htmlFor={type}>{type}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex">
            {/* Job Cards Section */}
            <div className="p-5 space-y-4">
              {/* Search Bar */}
              <div className="flex justify-center items-center mb-4">
                <div className="justify-center w-2/3 flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Search for jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex space-x-4 flex-wrap">
                <button className="bg-gray-600 text-white rounded-xl px-12 py-2 flex items-center space-x-2 ">
                  <FontAwesomeIcon icon={faCode} />{" "}
                  <span>Software Engineer</span>
                </button>
                <button className="bg-gray-600 text-white rounded-xl px-12 py-2 flex items-center space-x-2 ">
                  <FontAwesomeIcon icon={faShieldAlt} />{" "}
                  <span>Cyber Security Analyst</span>
                </button>
                <button className="bg-gray-600 text-white rounded-xl px-12 py-2 flex items-center space-x-2 ">
                  <FontAwesomeIcon icon={faChartBar} />{" "}
                  <span>Data Analyst</span>
                </button>
                <button className="bg-gray-600 text-white rounded-xl px-12 py-2 flex items-center space-x-2 ">
                  <FontAwesomeIcon icon={faPenNib} />{" "}
                  <span>UI/UX Designer</span>
                </button>
                {/* <button className="bg-gray-600 text-white rounded-xl px-12 py-2 flex items-center space-x-2 ">
                  <FontAwesomeIcon icon={faLaptopCode} />{" "}
                  <span>Web Developer</span>
                </button> */}
                {/* <button className="bg-gray-600 text-white rounded-xl px-12 py-2 flex items-center space-x-2 ">
                  <FontAwesomeIcon icon={faBug} />{" "}
                  <span>Quality Assurance (QA) Tester</span>
                </button>
                <button className="bg-gray-600 text-white rounded-xl px-12 py-2 flex items-center space-x-2 ">
                  <FontAwesomeIcon icon={faCube} />{" "}
                  <span>Blockchain Developer</span>
                </button>
                <button className="bg-gray-600 text-white rounded-xl px-12 py-2 flex items-center space-x-2 ">
                  <FontAwesomeIcon icon={faRobot} />{" "}
                  <span>AI Chatbot Developer</span>
                </button>
                <button className="bg-gray-600 text-white rounded-xl px-12 py-2 flex items-center space-x-2 ">
                  <FontAwesomeIcon icon={faServer} />{" "}
                  <span>DevOps Engineer</span>
                </button>
                <button className="bg-gray-600 text-white rounded-xl px-12 py-2 flex items-center space-x-2 ">
                  <FontAwesomeIcon icon={faFlask} />{" "}
                  <span>Research Assistant</span>
                </button>
                <button className="bg-gray-600 text-white rounded-xl px-12 py-2 flex items-center space-x-2 ">
                  <FontAwesomeIcon icon={faGamepad} />{" "}
                  <span>Game Developer</span>
                </button> */}
              </div>

              {/* Render Filtered Jobs */}
              {filteredJobs.map((job, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedJob(job)}
                  className="border border-gray-300 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-end mr-5">
                    <button>
                      <FontAwesomeIcon icon={faBookmark} />
                    </button>
                  </div>
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-12 h-12 mb-2"
                  />
                  <h3 className="font-bold text-lg">{job.company}</h3>
                  <p className="text-gray-700">{job.role}</p>
                  <p className="text-gray-600">{job.location}</p>
                  <p className="text-gray-800">{job.salary}</p>
                  <p className="text-gray-500">Applied: {job.applied}</p>
                </div>
              ))}
            </div>

            {/* Job Details Section */}
            {selectedJob && (
              <div className="w-3/5 p-5 bg-gray-50 rounded-lg shadow-lg">
                <div className=" flex justify-center items-center  py-9">
                  <img
                    src={selectedJob.logo}
                    alt={`${selectedJob.company} logo`}
                    className="flex-grow-12 h-12 mb-2"
                  />
                </div>

                <h2 className="flex justify-center items-center font-bold text-xl mb-4">
                  {selectedJob.role}
                </h2>
                <h3 className="flex justify-center items-center font-semibold text-lg mb-2">
                  {selectedJob.company} , {selectedJob.location}
                </h3>
                <h3 className="text-bold"> Salary </h3>
                <p className="text-gray-800 font-semibold space-y-4">
                  {selectedJob.salary}
                </p>
                <h3 className="text-lg font-bold mt-2">
                  {" "}
                  Minimum Qualifications{" "}
                </h3>
                <p className="text-gray-700 mt-2">
                  {selectedJob.minimumQualification}
                </p>
                <h3 className="text-lg font-bold mt-2">
                  Preferred Qualifications{" "}
                </h3>

                <p className="text-gray-700 mt-4">
                  {selectedJob.preferredQualification}
                </p>
                <h3 className="text-lg font-bold mt-2">About Job </h3>
                <p className="text-gray-700 mt-4">{selectedJob.aboutJob}</p>

                {/* Buttons Section */}
                <div className="flex justify-center items-center pb-4 space-x-4">
                  <button
                    onClick={() => alert("Applied successfully!")} // Example action for "Apply Now"
                    className=" bg-[#8DAFA8] text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    
  );
}

export default JobPortal;
