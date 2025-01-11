import React from "react";
import CandidateCard from "./CandidateCard";

const CandidateList = ({ candidates, onSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {candidates.map((candidate, index) => (
      <CandidateCard key={candidate.id} candidate={candidate} onSelect={onSelect} id={index} />
    ))}
  </div>
);

export default CandidateList;
