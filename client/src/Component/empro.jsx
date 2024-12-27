import React from "react";
import Navbar from "./Navbar";

const Empro = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-grow pt-16">
        {/* Left Panel */}
        <div className="w-2/3 overflow-y-auto bg-gray-100 p-6">
          {/* Company Profile Section */}
          <section className="mb-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/path/to/twitter-icon.png"
                alt="Twitter Logo"
                className="w-16 h-16 rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">Twitter</h2>
              <p className="text-gray-600">New York City, New York, USA</p>
              <p className="text-gray-600">Founded in 2006</p>
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

        {/* Right Panel */}
        <div className="w-1/3 bg-green-100 p-6 fixed right-0 top-16 h-[calc(100%-64px)] overflow-hidden">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center">
            <div className="bg-gray-300 w-24 h-24 rounded-full mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-800">
                ZAIMA AHMED
              </h3>
              <p className="text-gray-600">zaimaahmed101@gmail.com</p>
              <p className="text-gray-600 mt-2">📞 01736564761</p>
              <p className="text-gray-600">📍 Dhaka, Bangladesh</p>
              <p className="text-gray-600 mt-2">POST: Recruitment Manager</p>
              <textarea
                className="w-full mt-4 border border-gray-300 rounded-md p-2"
                placeholder="BIO"
              ></textarea>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empro;
