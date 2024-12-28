import React from "react";
import user from '../Assets/user.png';
import Navbar from "./Navbar";
import twitter from '../Assets/twitter.png';
const EmployerProfile = () => {
  return (
    <div className="myprofile-container flex flex-col font-sans bg-gray-100">
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-grow flex-col lg:flex-row">
        {/* Right Panel - Green panel on top for small screens and on the right for large screens */}
        <div 
        className="right-panel order-first lg:order-none lg:w-1/3 lg:sticky lg:top-24 z-10 p-5 bg-green-50 rounded-xl 
        shadow-lg h-[90vh] md:h-[85vh] box-border">
          <div className="profile-info text-center flex flex-col items-center justify-center">
            <img
              src={user}
              alt="Profile"
              className="profile-picture w-20 h-20 rounded-full mb-2"
            />
            <h3 className="font-semibold text-lg mb-6">ZAIMA AHMED</h3>
            <p>zaimahmed101@gmail.com</p>
            
            <p>📞 01735654761</p>
            <p>📍 Dhaka, Bangladesh</p>
            <p>Post: Recruitment manager</p>
          </div>
          <div className="bio mt-12">
            <h3 className="text-lg font-semibold mb-2">BIO</h3>
            <textarea
              className="bio-textarea w-full h-32 border-0 rounded-md p-2 bg-gray-50"
              readOnly
              placeholder="Your biography goes here..."
            ></textarea>
          </div>
          <div className="actions mt-6">
            <button className="edit-button w-full mb-2 p-2 border-0 rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-400">
              Edit Profile
            </button>
           
          </div>
        </div>

        {/* Left Panel */}
        <div className="w-full lg:w-2/3 overflow-y-auto bg-gray-100 p-6">
          {/* Company Profile Section */}
          <section className="mb-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center space-x-4">
                {/* Twitter Logo */}
                <img
                  src={twitter}
                  alt="Twitter Logo"
                  className="w-16 h-16 rounded-full"
                />
                {/* Company Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Twitter</h2>
                  <p className="text-gray-600">New York City, New York, USA</p>
                  <p className="text-gray-600">Founded in 2006</p>
                </div>
              </div>
              <hr className="my-4" />
              <h3 className="text-lg font-semibold text-gray-800">About</h3>
              <p className="text-gray-600 mt-2">
                Twitter, Inc. is a global social media and technology company
                that serves as a public conversation platform where users can
                share and discover real-time information through tweets.
              </p>
              <hr className="my-4" />
              <h3 className="text-lg font-semibold text-gray-800">
                Why work with us?
              </h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Competitive salaries and equity options</li>
                <li>Comprehensive health and wellness benefits</li>
                <li>Remote and hybrid work options</li>
                <li>Learning and development programs</li>
                <li>
                  Inclusive culture that celebrates diversity and creativity
                </li>
              </ul>
            </div>
          </section>
          {/* Active Job Posts */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Active Job Posts
            </h2>
            <div className="space-y-4">
              {/* Job Post Cards */}
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-6 border border-gray-300 relative"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    Customer Support Intern
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <strong>Salary:</strong> $450 - $750/month (stipend)
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Responsibilities:</strong>
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    <li>Respond to user questions and concerns</li>
                    <li>Assist in troubleshooting common issues</li>
                  </ul>
                  <p className="text-gray-600 mt-2">
                    <strong>Requirements:</strong>
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    <li>Strong communication skills</li>
                    <li>
                      Basic familiarity with Twitter as a platform
                    </li>
                  </ul>
                  <button className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    ✏️ Edit
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
