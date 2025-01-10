import React, { useState, useEffect, useRef } from "react";

const SearchBar = ({ onFilterSelect, onSearch, onRoleSelect }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const filters = ["All", "Full-Time", "Intern"];
  const roles = ["Web Developer", "UX/UI Specialist", "Database Engineer"];
  const sortOptions = ["Name", "Date Applied"];

  const filterRef = useRef(null); 

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterSelect(filter);
  };

  const handleSort = (sortBy) => {
    onSearch({ sortBy });
    setIsSortDropdownOpen(false); 
  };

  const handleRoleSelect = (role) => {
    onRoleSelect(role); 
    setIsRoleDropdownOpen(false); 
  };

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
    setIsRoleDropdownOpen(false); 
  };

  const toggleRoleDropdown = () => {
    setIsRoleDropdownOpen(!isRoleDropdownOpen);
    setIsSortDropdownOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterDropdownOpen(false);
        setIsSortDropdownOpen(false);
        setIsRoleDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg mt-4 relative" ref={filterRef}>
      <div className="flex gap-3 lg:gap-10 flex-grow">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`font-semibold text-sm ${activeFilter === filter ? "text-black border-b-2 border-black" : "text-gray-500"}`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="relative flex ml-auto">
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg font-semibold"
          onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
        >
          Filter
        </button>

        {isFilterDropdownOpen && (
          <div className="absolute left-0 top-full bg-white shadow-md rounded-lg mt-2 w-auto z-10">
            <div className="relative">
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={toggleSortDropdown}>
                Sort
              </button>
              {isSortDropdownOpen && (
                <div className="absolute left-[-100%] top-0 bg-white shadow-md rounded-lg mt-0 w-auto z-20">
                  {sortOptions.map((sortOption) => (
                    <button key={sortOption} onClick={() => handleSort(sortOption)} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                      {sortOption}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative mt-2">
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={toggleRoleDropdown}>
                Filter by Role
              </button>
              {isRoleDropdownOpen && (
                <div className="absolute left-[-100%] top-0 bg-white shadow-md rounded-lg mt-0 w-auto z-20">
                  {roles.map((role) => (
                    <button key={role} onClick={() => handleRoleSelect(role)} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
