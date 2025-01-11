import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Gmail from '../../Assets/gmail.svg'
import Navbar from "../Navbar";
import {motion} from 'framer-motion';

const Application = () => {
  const [filter, setFilter] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");

  const applicationsPerPage = 7;

  const applications = useMemo(
    () => [
      { id: "#APL-001", date: "Dec 20, 2024, 7:00 PM", company: "Tiger IT", position: "Junior Developer", status: "Pending" },
      { id: "#APL-002", date: "Dec 20, 2024, 7:10 PM", company: "Google", position: "Software Engineer", status: "Accepted" },
      { id: "#APL-003", date: "Dec 20, 2024, 7:24 PM", company: "Amazon", position: "Frontend Developer", status: "Rejected" },
      { id: "#APL-004", date: "Dec 20, 2024, 7:00 PM", company: "Microsoft", position: "Backend Developer", status: "Viewed" },
      { id: "#APL-005", date: "Dec 20, 2024, 7:30 PM", company: "Netflix", position: "DevOps Engineer", status: "Pending" },
      { id: "#APL-006", date: "Dec 20, 2024, 7:30 PM", company: "Netflix", position: "DevOps Engineer", status: "Pending" },
      { id: "#APL-007", date: "Dec 20, 2024, 7:00 PM", company: "Microsoft", position: "Backend Developer", status: "Viewed" },
      { id: "#APL-008", date: "Dec 20, 2024, 7:00 PM", company: "Microsoft", position: "Backend Developer", status: "Viewed" },
      { id: "#APL-009", date: "Dec 20, 2024, 7:24 PM", company: "Amazon", position: "Frontend Developer", status: "Rejected" },
      { id: "#APL-010", date: "Dec 20, 2024, 7:24 PM", company: "Amazon", position: "Frontend Developer", status: "Rejected" },
    ],
    []
  );

  const handleFilterChange = (filterOption) => {
    setFilter(filterOption);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    let data = applications;
    if (filter !== "All") {
      data = data.filter((app) => app.status === filter);
    }

    if (searchKeyword.trim() !== "") {
      data = data.filter((app) =>
        Object.values(app)
          .join(" ")
          .toLowerCase()
          .includes(searchKeyword.toLowerCase())
      );
    }

    data = data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredData(data);
  }, [filter, searchKeyword, sortOrder, applications]);


  const totalPages = Math.ceil(filteredData.length / applicationsPerPage);
  const startIndex = (currentPage - 1) * applicationsPerPage;
  const endIndex = startIndex + applicationsPerPage;
  const currentApplications = filteredData.slice(startIndex, endIndex);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "border border-gray-500 bg-gray-200 bg-opacity-80 text-gray-500";
      case "Accepted":
        return "bg-[#37b024] text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      case "Viewed":
        return "border border-yellow-200 bg-yellow-200 bg-opacity-20 text-gray-500";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="bg-background w-full h-screen">
      <Navbar />
      <div className="px-4 py-8 md:px-8 mx-auto max-w-screen-xl mt-0 mb-48">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'backInOut' }}
          className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faBars} className="text-3xl" />
            <p className="font-kanit text-3xl">Applications</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'backInOut' }}
          className="relative w-full md:w-1/2 mr-20">
            <input
              type="text"
              value={searchKeyword}
              onChange={handleSearchChange}
              placeholder="Search something here..."
              className="w-full p-2 pl-10 border bg-[#e2e5dd] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: 'backInOut' }}
          className="flex flex-col gap-1">
            <p className="font-kanit text-lg">Showing Application Status</p>
            <p className="font-kanit text-gray-700 text-opacity-50">for each company</p>
          </motion.div>
          <div className="flex gap-2 flex-wrap">
            {["All", "Pending", "Rejected", "Accepted", "Viewed"].map((filterOption, index) => (
              <motion.button
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: 'backInOut' }}
                key={filterOption}
                onClick={() => handleFilterChange(filterOption)}
                className={`px-4 py-2 text-sm rounded-full border ${
                  filter === filterOption ? "bg-[#419a5b] text-white" : "bg-[#e2e5dd]"
                } hover:bg-[#419a5b] hover:text-white`}
              >
                {filterOption}
              </motion.button>
            ))}
          </div>
          <motion.select
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'backInOut' }}
            value={sortOrder}
            onChange={handleSortChange}
            className="p-2 rounded-full bg-[#e2e5dd]"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </motion.select>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'backInOut' }}
          className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg ">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b p-4 text-left text-lg font-kanit">ID</th>
                <th className="border-b p-4 text-left text-lg font-kanit">Date Applied</th>
                <th className="border-b p-4 text-left text-lg font-kanit">Company</th>
                <th className="border-b p-4 text-left text-lg font-kanit">Position</th>
                <th className="border-b p-4 text-left text-lg font-kanit">Contact</th>
                <th className="border-b p-4 text-left text-lg font-kanit">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentApplications.map((app, index) => (
                <motion.tr 
                  key={app.id} 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: 'backInOut' }}
                  className="bg-white rounded-lg hover:bg-gray-100"
                >
                  <td className="p-4 text-sm font-kanit">{app.id}</td>
                  <td className="p-4 text-sm font-kanit">{app.date}</td>
                  <td className="p-4 text-sm flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
                    <span className="font-kanit">{app.company}</span>
                  </td>
                  <td className="p-4 text-sm font-kanit">{app.position}</td>
                  <td className="p-4 text-sm flex items-center gap-4">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-blue-500 cursor-pointer hover:text-blue-700 hover:scale-110 text-lg"
                    />
                    
                    <img src={Gmail} alt="contact" 
                      className="h-6 hover:scale-110 cursor-pointer" 
                    />
                  </td>
                  <td className="p-4 text-sm">
                    <span
                      className={`flex items-center justify-center min-w-[40px] h-[30px] px-4 py-1 rounded-full text-regular font-kanit ${getStatusClass(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div className="flex justify-between gap-1 items-center mt-4">
          <div className="flex justify-start">
            <p className="font-kanit opacity-50">
              Showing {startIndex + 1} - {Math.min(endIndex, filteredData.length)} of {filteredData.length} Applications
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 border font-kanit rounded-full text-sm hover:bg-gray-100"
              disabled={currentPage === 1}
            >
              &lt;&lt; Previous
            </button>
            <div className="flex bg-[#e2e5dd] rounded-full">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 border rounded-full font-kanit text-sm ${
                    currentPage === page ? "bg-[#419a5b] text-white" : "hover:bg-[#419a5b] hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 border rounded-full text-sm font-kanit hover:bg-gray-100"
              disabled={currentPage === totalPages}
            >
              Next &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
