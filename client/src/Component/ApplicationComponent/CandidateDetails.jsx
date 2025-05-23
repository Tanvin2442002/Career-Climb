import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import toast, { Toaster } from "react-hot-toast";
import { ToastError, ToastSuccess } from "../../UI/ToastError";

const url = process.env.REACT_APP_API_URL;

const CandidateDetails = ({ candidate, userID, onClose, setChange }) => {
  const [pdfPreview, setPdfPreview] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const fetchCV = async () => {
    try {
      const response = await fetch(`${url}/applicants/cv/${candidate.employee_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        ToastError("Failed to fetch CV");
        return false;
      }

      const data = await response.json();
      return data.cv || false;
    } catch (error) {
      ToastError("Failed to fetch CV");
      return false;
    }
  };


  const handleViewCV = async () => {
    const param = {
      userId: userID,
      senderId: candidate.employee_id,
      jobId: candidate.post_id,
      user_type: "employee",
      type: "application_status",
      status: "Viewed",
      employerName: candidate.employer_name,
      role: candidate.role,
    };
    const getURL = await fetchCV();

    if (getURL) {
      try {
        const response = await fetch(`${url}/create-notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(param),
        });
        const data = await response.json();
      } catch (error) {
        ToastError("Failed to create notification");
      }
      try {
        const response = await fetch(`${url}/application/viewed`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ application: candidate }),
        });
      } catch (error) {
        ToastError("Failed to update application status");
      }
      setPdfPreview(getURL);
      setPopupVisible(true);
    } else {
      ToastError("No CV found!");
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleAccept = async () => {
    const param = {
      userId: userID,
      senderId: candidate.employee_id,
      jobId: candidate.post_id,
      user_type: "employee",
      type: "application_status",
      status: "Accepted",
      employerName: candidate.employer_name,
      role: candidate.role,
    };

    try {
      const response = await fetch(`${url}/create-notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
      });
      const data = await response.json();
  
    } catch (error) {
      ToastError("Failed to create notification");
    }
    try {
      const response = await fetch(`${url}/application/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ application: candidate }),
      });
      if(response.ok){
        ToastSuccess("Applicant Accepted!");
        setChange(true);
        onClose();
      }
    } catch (error) {
      ToastError("Failed to accept applicant");
    }
  };

  const handleReject = async () => {

    const param = {
      userId: userID,
      senderId: candidate.employee_id,
      jobId: candidate.post_id,
      user_type: "employee",
      type: "application_status",
      status: "Rejected",
      employerName: candidate.employer_name,
      role: candidate.role,
    };
    try {
      const response = await fetch(`${url}/create-notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
      });
      const data = await response.json();
  
    } catch (error) {
      ToastError("Failed to create notification");
    }
    try {
      const response = await fetch(`${url}/application/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ application: candidate }),
      });
      if(response.ok){
        ToastSuccess("Applicant Rejected!");
        onClose();
        setChange(true);
      }
    } catch (error) {
      ToastError("Failed to reject applicant");
    }
  };

  return (
    <AnimatePresence>
      <Toaster />
      <div className="p-6 bg-white shadow-xl rounded-lg max-h-[80vh] overflow-y-auto relative">
        <button
          className="text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="inline-flex items-center justify-between">
          <h2 className="text-2xl font-bold mt-2 ml-5">
            {candidate.employee_name}
          </h2>
          <button
            onClick={handleViewCV}
            className="bg-gray-500 text-white px-4 py-0 ml-12 mt-2 rounded-lg"
          >
            View CV
          </button>
        </div>
        <p className="text-gray-600">{candidate.role}</p>
        <h3 className="mt-4 text-lg font-bold">About</h3>
        <p className="text-sm text-gray-700">
          {candidate.bio}
        </p>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleReject}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
          >
            Accept
          </button>
        </div>
        {popupVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <div className="relative w-full h-full p-4 flex items-center justify-center">
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-12 text-red-600 text-xl font-bold hover:text-red-700"
                title="Close"
              >
                ✖
              </button>
              <div className="absolute top-4 right-4 text-gray-600">
                <span className="cursor-pointer">⋮</span>
              </div>
              <iframe
                src={pdfPreview}
                className="w-[90%] h-[90%] rounded-lg shadow-xl bg-white"
                title="CV Preview"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default CandidateDetails;
