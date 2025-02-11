import React, { useState, useEffect } from "react";
import user from '../../Assets/user.png';
import Navbar from "../Navbar";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Auth/SupabaseClient";

const url = process.env.REACT_APP_API_URL;


const EmployerProfile = () => {
  const [profile, setProfile] = useState({});
  const [userId, setUserId] = useState();
  const [companyLogo, setCompanyLogo] = useState(null);
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCompanyPopupOpen, setIsCompanyPopupOpen] = useState(false);

  const [initialProfile, setInitialProfile] = useState(profile);

  useEffect(() => {
    const cachedProfile = JSON.parse(localStorage.getItem("employerProfile"));
    if (cachedProfile) setProfile(cachedProfile);
    const fetchEmployer = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUserId(storedUser.uuid);
      if (!storedUser || !storedUser.uuid) {
        return;
      }

      try {
        const response = await fetch(`${url}/api/employer?id=${storedUser.uuid}`);
       
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProfile(data[0]);
      
        setCompanyLogo(data[0].company_logo);
      } catch (error) {
      }
    };

    fetchEmployer();

  }, []);

  // Handle profile save
  const handleSave = async () => {
    //localStorage.setItem("employerProfile", JSON.stringify(profile));
    try {
      const response = await fetch(`${url}/api/employer2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profile.name,
          phone: profile.phone_no,
        
          bio: profile.bio,
          id: userId,
        }),
      });


      if (response.ok) {
        setIsPopupOpen(false);
        toast.success("Profile Updated", {
          style: {
            backgroundColor: "rgb(195, 232, 195)", // Sets background to green
            color: "black", // Sets text color to white
            fontWeight: "bold",
          },
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });// Close the popup
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }

  };

  // Handle company save
  const handleSaveCompany = async () => {
    try {
      const fileName = `${Date.now()}-${selectedFile.name}`; // Unique filename

      fileName.replaceAll(' ', '_');
  
      const { data, error } = await supabase.storage.from('company_logo').upload(fileName, selectedFile, {
        cacheControl: '3600',
        upsert: false,
      });
  
      if (error) {
        alert("Failed to upload image.");
        return;
      }
      const { data: publicUrlData } = supabase
        .storage
        .from('company_logo')
        .getPublicUrl(fileName);
      const publicUrl = publicUrlData.publicUrl;

      //setSelectedFile(null);


      const response = await fetch(`${url}/api/update-employer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          company: profile.company_name,
          company_location: profile.company_location,
          founded: profile.founded,
          company_detail: profile.company_details,
          why_work: profile.why_work,
          logo: publicUrl, // Send Supabase logo URL
        }),
      });

      if (response.ok) {
        toast.success("Company Info Updated", {
          style: {
            backgroundColor: "rgb(195, 232, 195)", // Sets background to green
            color: "black", // Sets text color to white
            fontWeight: "bold",
          },
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });// Close the popup
        setIsCompanyPopupOpen(false);
      } else {
        alert("Failed to update company profile.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };


  const [selectedFile, setSelectedFile] = useState(null); // Store selected file



  // Handle logo change
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    //if (!file) return;

    setSelectedFile(file); // Store file for later upload

   
  };
  // Open the profile edit popup and save the initial state
  const openProfilePopup = () => {
    setInitialProfile(profile);
    setIsPopupOpen(true);
  };

  // Open the company edit popup and save the initial state
  const openCompanyPopup = () => {
    setInitialProfile(profile);
    setIsCompanyPopupOpen(true);
  };

  // Restore profile state if canceled
  const handleCancelProfile = () => {
    setProfile(initialProfile); // Restore to initial state
    setIsPopupOpen(false);
  };

  // Restore company state if canceled
  const handleCancelCompany = () => {
    setProfile(initialProfile); // Restore to initial state
    setIsCompanyPopupOpen(false);
  };


  return (
    <div className="myprofile-container flex flex-col font-sans bg-gray-100">
      <Navbar />
      <Toaster />
      {/* Main Content */}
      <div className="flex flex-grow flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="right-panel order-first lg:order-none lg:w-1/3 lg:sticky lg:top-24 z-10 p-5 bg-green-50 rounded-xl 
        shadow-lg h-[90vh] md:h-[85vh] box-border">
          <div className="profile-info text-center flex flex-col items-center justify-center">
            <img
              src={profile.profile_pic ? profile.profile_pic : user}
              alt="Profile"
              className="profile-picture w-20 h-20 rounded-full mb-2"
            />
            <h3 className="font-semibold text-lg mb-6">{profile.name}</h3>
            <p>{profile.email}</p>
            <p>📞 {profile.phone_no}</p>
            <p>Post: {profile.role}</p>
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
                {companyLogo ? (
                <img
                  src={companyLogo}
                  alt="Company Logo"
                  className="w-16 h-16 rounded-full"
                />
                ) : (<p>Loading logo...</p>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {profile.company_name}
                  </h2>
                  <p className="text-gray-600">{profile.company_location}</p>
                  <p className="text-gray-600">Founded in {profile.founded}</p>
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
              <p className="text-gray-600 mt-2">{profile.company_details}</p>
              <hr className="my-4" />
              <h3 className="text-lg font-semibold text-gray-800">
                Why work with us?
              </h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <p className="text-gray-600 mt-2">{profile.why_work}</p>
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
                  value={profile.phone_no}
                  onChange={(e) => setProfile({ ...profile, phone_no: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Post</label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
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
                  value={profile.company_name}
                  onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={profile.company_location}
                  onChange={(e) => setProfile({ ...profile, company_location: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Founded</label>
                <input
                  type="text"
                  value={profile.founded}
                  onChange={(e) => setProfile({ ...profile, founded: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">About</label>
                <textarea
                  value={profile.company_details}
                  onChange={(e) => setProfile({ ...profile, company_details: e.target.value })}
                  className="w-full border rounded-md p-2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Why Work With Us</label>
                <textarea
                  value={profile.why_work}
                  onChange={(e) => setProfile({ ...profile, why_work: e.target.value })}
                  className="w-full border rounded-md p-2"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveCompany}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400">
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelCompany}
                  className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400">
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
