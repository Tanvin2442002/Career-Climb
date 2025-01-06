import React, { useState, useEffect } from "react";
import CandidateList from "./CandidateList";
import CandidateDetails from "./CandidateDetails";
import SearchBar from "./SearchBar";
import Navbar from "../Navbar";

const ApplicationPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filter, setFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortOption, setSortOption] = useState(""); // Add sortOption state

  const candidates = [
    { id: 1, name: "Robert Miller", role: "Web Developer", salary: "$90k", rating: 4.2, type: "full-time", appliedDate: "2024-12-01" },
    { id: 2, name: "Yusuf Reza Hasnat", role: "UX/UI Specialist", salary: "$70k", rating: 5.0, type: "intern", appliedDate: "2024-11-15" },
    { id: 3, name: "John Doe", role: "Database Engineer", salary: "$60k", rating: 4.1, type: "full-time", appliedDate: "2024-10-10" },
    { id: 4, name: "Emily Brown", role: "Graphic Designer", salary: "$50k", rating: 4.3, type: "intern", appliedDate: "2024-12-05" },
    { id: 5, name: "Michael Le", role: "Product Manager", salary: "$100k", rating: 4.8, type: "full-time", appliedDate: "2024-11-22" },
    { id: 6, name: "Michael L", role: "Product Manager", salary: "$100k", rating: 4.8, type: "full-time", appliedDate: "2024-11-22" },
    { id: 7, name: "Michael", role: "Product Manager", salary: "$100k", rating: 4.8, type: "full-time", appliedDate: "2024-11-22" },
    { id: 8, name: "Michae", role: "Product Manager", salary: "$100k", rating: 4.8, type: "full-time", appliedDate: "2024-11-22" },
    { id: 9, name: "Micha", role: "Product Manager", salary: "$100k", rating: 4.8, type: "full-time", appliedDate: "2024-11-22" },
    { id: 10, name: "Mich", role: "Product Manager", salary: "$100k", rating: 4.8, type: "full-time", appliedDate: "2024-11-22" },
    { id: 11, name: "Michael ee", role: "Product Manager", salary: "$100k", rating: 4.8, type: "full-time", appliedDate: "2024-11-22" },
    { id: 12, name: "Micha Lee", role: "Product Manager", salary: "$100k", rating: 4.8, type: "full-time", appliedDate: "2024-11-22" },
    { id: 13, name: "Micl Lee", role: "Product Manager", salary: "$100k", rating: 4.8, type: "full-time", appliedDate: "2024-11-22" },
    { id: 14, name: "Miael Lee", role: "Product Manager", salary: "$100k", rating: 4.8, type: "full-time", appliedDate: "2024-11-22" }
  ];

  // Filter candidates based on filter and roleFilter
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesRole = !roleFilter || candidate.role.toLowerCase() === roleFilter.toLowerCase();

    if (filter === "All") {
      return matchesRole;
    }

    if (filter === "Full-Time") {
      return candidate.type === "full-time";
    }

    if (filter === "Intern") {
      return candidate.type === "intern";
    }
    return false;
  });

  // Sort candidates if sortOption is set
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortOption === "Date Applied") {
      return new Date(b.appliedDate) - new Date(a.appliedDate); // Newest first
    }
    return 0; // No sorting by default
  });

  return (
    <div>
      <Navbar />
      <div className="bg-white shadow-md p-4">
        <SearchBar
          onFilterSelect={setRoleFilter}
          onLeftFilterSelect={setFilter}
          onRoleSelect={setRoleFilter}
          onSortSelect={setSortOption} // Pass sort option handler
        />
      </div>
      <div className="bg-background min-h-screen p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 h-screen md:h-screen overflow-auto p-4 scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {sortedCandidates.length > 0 ? (
            <CandidateList candidates={sortedCandidates} onSelect={setSelectedCandidate} />
          ) : (
            <div className="text-center text-gray-500">No candidates found.</div>
          )}
        </div>

        {selectedCandidate && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <CandidateDetails candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
      </div>
    </div>
  )}
      </div>
    </div>
  );
};

export default ApplicationPage;
