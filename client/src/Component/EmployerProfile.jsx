import React, { useState, useEffect } from "react";
import user from '../Assets/user.png';
import Navbar from "./Navbar";
import twitter from '../Assets/twitter.png';

const EmployerProfile = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCompanyPopupOpen, setIsCompanyPopupOpen] = useState(false);
  
  // State for profile
  const [profile, setProfile] = useState({
    name: "ZAIMA AHMED",
    email: "zaimahmed101@gmail.com",
    phone: "01735654761",
    location: "Dhaka, Bangladesh",
    post: "Recruitment manager",
    bio: "Your biography goes here...",
  });
  
  // State for company
  const [company, setCompany] = useState({
    name: "Twitter",
    location: "New York City, New York, USA",
    founded: "2006",
    about:
      "Twitter, Inc. is a global social media and technology company that serves as a public conversation platform where users can share and discover real-time information through tweets.",
    whyWorkWithUs: [
      "Competitive salaries and equity options",
      "Comprehensive health and wellness benefits",
      "Remote and hybrid work options",
      "Learning and development programs",
      "Inclusive culture that celebrates diversity and creativity",
    ],
    logo: ''
  });

  // Store the initial state for reverting on cancel
  const [initialProfile, setInitialProfile] = useState(profile);
  const [initialCompany, setInitialCompany] = useState(company);

  useEffect(() => {
    const cachedProfile = JSON.parse(localStorage.getItem("employerProfile"));
    const cachedCompany = JSON.parse(localStorage.getItem("companyInfo"));
    if (cachedProfile) setProfile(cachedProfile);
    if (cachedCompany) setCompany(cachedCompany);
  }, []);

  // Handle profile save
  const handleSave = () => {
    localStorage.setItem("employerProfile", JSON.stringify(profile));
    setIsPopupOpen(false);
  };

  // Handle company save
  const handleSaveCompany = () => {
    localStorage.setItem("companyInfo", JSON.stringify(company));
    setIsCompanyPopupOpen(false);
  };

  // Handle logo change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompany((prevState) => ({
          ...prevState,
          logo: reader.result, // Store the base64 image
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open the profile edit popup and save the initial state
  const openProfilePopup = () => {
    setInitialProfile(profile);
    setIsPopupOpen(true);
  };

  // Open the company edit popup and save the initial state
  const openCompanyPopup = () => {
    setInitialCompany(company);
    setIsCompanyPopupOpen(true);
  };

  // Restore profile state if canceled
  const handleCancelProfile = () => {
    setProfile(initialProfile); // Restore to initial state
    setIsPopupOpen(false);
  };

  // Restore company state if canceled
  const handleCancelCompany = () => {
    setCompany(initialCompany); // Restore to initial state
    setIsCompanyPopupOpen(false);
  };

  return (
    <div className="myprofile-container flex flex-col font-sans bg-gray-100">
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-grow flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="right-panel order-first lg:order-none lg:w-1/3 lg:sticky lg:top-24 z-10 p-5 bg-green-50 rounded-xl 
        shadow-lg h-[90vh] md:h-[85vh] box-border">
          <div className="profile-info text-center flex flex-col items-center justify-center">
            <img
              src={user}
              alt="Profile"
              className="profile-picture w-20 h-20 rounded-full mb-2"
            />
            <h3 className="font-semibold text-lg mb-6">{profile.name}</h3>
            <p>{profile.email}</p>
            <p>📞 {profile.phone}</p>
            <p>📍 {profile.location}</p>
            <p>Post: {profile.post}</p>
          </div>
          <div className="bio mt-12">
            <h3 className="text-lg font-semibold mb-2">BIO</h3>
            <textarea
              className="bio-textarea w-full h-32 border-0 rounded-md p-2 bg-gray-50"
              readOnly
              value={profile.bio}
            ></textarea>
          </div>
          <div className="actions mt-6">
            <button className="edit-button w-full mb-2 p-2 border-0 rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-400"
              onClick={openProfilePopup}>
              Edit Profile
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-2/3 overflow-y-auto bg-gray-100 p-6">
          {/* Company Profile Section */}
          <section className="mb-6">
            <div className="bg-white shadow-md rounded-lg p-6 relative">
              <div className="flex items-center space-x-4">
                <img
                  src={company.logo || twitter}
                  alt="Company Logo"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {company.name}
                  </h2>
                  <p className="text-gray-600">{company.location}</p>
                  <p className="text-gray-600">Founded in {company.founded}</p>
                </div>
                <button
                  className="absolute bottom-140 right-10 p-2 border-0 rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-400"
                  onClick={openCompanyPopup}
                >
                  Edit
                </button>
              </div>
              <hr className="my-4" />
              <h3 className="text-lg font-semibold text-gray-800">About</h3>
              <p className="text-gray-600 mt-2">{company.about}</p>
              <hr className="my-4" />
              <h3 className="text-lg font-semibold text-gray-800">
                Why work with us?
              </h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {Array.isArray(company.whyWorkWithUs) && company.whyWorkWithUs.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
          {/* Active Job Posts */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Active Job Posts
            </h2>
            <div className="space-y-4">
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
                    <li>Basic familiarity with Twitter as a platform</li>
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Profile Edit Popup */}
      {isPopupOpen && (
        <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="popup-content bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative z-60">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Post</label>
                <input
                  type="text"
                  value={profile.post}
                  onChange={(e) => setProfile({ ...profile, post: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full border rounded-md p-2"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelProfile}
                  className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Company Edit Popup */}
      {isCompanyPopupOpen && (
        <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="popup-content bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Company Info</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Company Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  value={company.name}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={company.location}
                  onChange={(e) => setCompany({ ...company, location: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Founded</label>
                <input
                  type="text"
                  value={company.founded}
                  onChange={(e) => setCompany({ ...company, founded: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">About</label>
                <textarea
                  value={company.about}
                  onChange={(e) => setCompany({ ...company, about: e.target.value })}
                  className="w-full border rounded-md p-2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Why Work With Us</label>
                <textarea
                  value={company.whyWorkWithUs.join("\n")}
                  onChange={(e) => setCompany({ ...company, whyWorkWithUs: e.target.value.split("\n") })}
                  className="w-full border rounded-md p-2"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveCompany}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelCompany}
                  className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerProfile;
