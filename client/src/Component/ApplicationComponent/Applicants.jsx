import React, { useState, useEffect } from "react";
import CandidateList from "./CandidateList";
import CandidateDetails from "./CandidateDetails";
import SearchBar from "./SearchBar";
import Navbar from "../Navbar";
import Calendar from "./Calender";
import { motion, AnimatePresence } from "framer-motion";
import EventModal from "./Event";
import  toast,{ Toaster } from "react-hot-toast";

const url = process.env.REACT_APP_API_URL;

const ApplicationPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filter, setFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [date, setDate] = useState(null);
  const [Change,setChange] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [eventSaved, setEventSaved] = useState(false);

  const userinfo = localStorage.getItem("user");
  const userID = JSON.parse(userinfo).uuid;

  const fetchCandidates = async (userID) => {
    try {
      const response = await fetch(`${url}/applicants/${userID}`);
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCandidates(userID);
  }, [userID]);

  useEffect(()=>{
    if(Change){
      fetchCandidates(userID);
      setChange(false);
    }
  },[Change,userID]);

  useEffect(() => {
    if (date) {
      setPopupVisible(true);
    }
  }, [date]);

  const handleSaveEvent = () => {
    // console.log("Event Saved!");
    setEventSaved(true); 
    setPopupVisible(false);
    if(eventSaved) {
      toast.success("Event added to calender!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressClassName: "bg-white",
      });
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesRole =
      !roleFilter || candidate.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesJobType =
      filter === "All" ||
      filter.toLowerCase() === candidate.job_type.toLowerCase();

    return matchesRole && matchesJobType;
  });

  useEffect(() => {
    if (filter === "All") {
      setRoleFilter("");
      setFilter("All");
      setSortOption("");
      setSelectedCandidate(null);
      fetchCandidates(userID);
    }
  }, [filter]);

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortOption === "Date Applied") {
      return new Date(b.appliedDate) - new Date(a.appliedDate);
    }
    return 0;
  });

  return (
    <div>
      <Toaster />
      {popupVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setPopupVisible(false)}
        >
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "backInOut" }}
              exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <EventModal
                date={date}
                setPopupVisible={setPopupVisible}
                onSave={handleSaveEvent} 
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <Navbar />
      <div className="bg-background shadow-md">
        <SearchBar
          onFilterSelect={setRoleFilter}
          onLeftFilterSelect={setFilter}
          onRoleSelect={setRoleFilter}
          onSortSelect={setSortOption}
          fetchCandidates={fetchCandidates}
          uuid={userID}
        />
      </div>
      <div className="bg-background min-h-screen p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 h-screen md:h-screen overflow-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {sortedCandidates.length > 0 ? (
            <CandidateList
              candidates={sortedCandidates}
              onSelect={setSelectedCandidate}
            />
          ) : (
            <div className="text-center text-gray-500">
              No candidates found.
            </div>
          )}
        </div>
        <div>
          <Calendar setClickeddate={setDate} setEventSaved={setEventSaved} />
        </div>
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <AnimatePresence>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "backInOut" }}
                exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
              >
                <CandidateDetails
                  candidate={selectedCandidate}
                  userID={userID}
                  onClose={() => setSelectedCandidate(null)}
                  setChange = {setChange}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationPage;
