import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const CandidateDetails = ({ candidate, onClose }) => {
  const [pdfPreview, setPdfPreview] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleViewCV = () => {
    const storedPdf = sessionStorage.getItem("uploadedCV");
    if (storedPdf) {
      setPdfPreview(storedPdf);
      setPopupVisible(true);
    } else {
      alert("No CV found. Please upload the candidate's CV first.");
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <AnimatePresence>
      <div className="p-6 bg-white shadow-xl rounded-lg max-h-[80vh] overflow-y-auto relative">
        <button
          className="text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="inline-flex items-center justify-between">
          <h2 className="text-2xl font-bold mt-2 ml-5">{candidate.name}</h2>
          <button
            onClick={handleViewCV}
            className="bg-gray-500 text-white px-4 py-0 ml-12 mt-2 rounded-lg"
          >
            View CV
          </button>
        </div>
        <p className="text-gray-600">{candidate.role}</p>
        <p className="text-yellow-500 mt-2">⭐ {candidate.rating}</p>

        <h3 className="mt-4 text-lg font-bold">About</h3>
        <p className="text-sm text-gray-700">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five
          centuries, but also the leap into electronic typesetting, remaining
          essentially unchanged. It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including versions
          of Lorem Ipsum.
        </p>

        <div className="flex justify-between mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
            Reject
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
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
