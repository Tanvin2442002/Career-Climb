import React, { useState } from "react";
import CandidateList from "./CandidateList";
import CandidateDetails from "./CandidateDetails";
import SearchBar from "./SearchBar";
import Navbar from "../Navbar";

const ApplicationPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filter, setFilter] = useState("All"); // Default filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState(""); // Role filter state

  const candidates = [
    { id: 1, name: "Robert Miller", role: "Web Developer", salary: "$90k", rating: 4.2, type: "full-time", appliedDate: "2024-12-01" },
    { id: 2, name: "Yusuf Reza Hasnat", role: "UX/UI Specialist", salary: "$70k", rating: 5.0, type: "intern", appliedDate: "2024-11-15" },
    { id: 3, name: "John Doe", role: "Database Engineer", salary: "$60k", rating: 4.1, type: "full-time", appliedDate: "2024-10-10" },
    { id: 4, name: "Emily Brown", role: "Graphic Designer", salary: "$50k", rating: 4.3, type: "intern", appliedDate: "2024-12-05" },
    { id: 5, name: "Michael Lee", role: "Product Manager", salary: "$100k", rating: 4.8, type: "full-time", appliedDate: "2024-11-22" },
  ];

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearchQuery = !searchQuery || candidate.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !roleFilter || candidate.role.toLowerCase() === roleFilter.toLowerCase();

    if (filter === "All") {
      return matchesSearchQuery; 
    }

    if (filter === "Full-Time") {
      return candidate.type === "full-time" && matchesSearchQuery && matchesRole;
    }

    if (filter === "Intern") {
      return candidate.type === "intern" && matchesSearchQuery && matchesRole;
    }

    

    return false;
  });

  return (
    <div>
      <Navbar />
      <div className="bg-white shadow-md p-4">
        <SearchBar
          onFilterSelect={setFilter}
          onSearch={setSearchQuery}
          onRoleSelect={setRoleFilter} 
        />
      </div>
      <div className="bg-background min-h-screen p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {filteredCandidates.length > 0 ? (
            <CandidateList candidates={filteredCandidates} onSelect={setSelectedCandidate} />
          ) : (
            <div className="text-center text-gray-500">No candidates found.</div>
          )}
        </div>

        {selectedCandidate && (
          <div className="md:col-span-1">
            <CandidateDetails candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationPage;
