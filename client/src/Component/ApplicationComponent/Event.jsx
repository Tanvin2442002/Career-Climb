import { useState } from "react";
import { FaVideo, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";

export default function EventModal() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2025-02-12");
  const [startTime, setStartTime] = useState("20:00");
  const [endTime, setEndTime] = useState("21:00");
  const [allDay, setAllDay] = useState(false);

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 relative">
      <button className="absolute top-2 right-2 text-gray-500">
        <IoMdClose size={20} />
      </button>
      <input
        type="text"
        placeholder="Add title"
        className="w-full text-xl font-semibold outline-none border-b pb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex space-x-2 mt-3">
        <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md">Event</button>
        <button className="px-3 py-1 text-gray-600 rounded-md">Task</button>
        <button className="px-3 py-1 text-gray-600 rounded-md flex items-center">
          Appointment <span className="ml-1 bg-blue-500 text-white px-2 rounded-full text-xs">New</span>
        </button>
      </div>
      <div className="mt-4">
        <input
          type="date"
          className="w-full border p-2 rounded-md"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="flex items-center mt-2 space-x-2">
          <input
            type="time"
            className="border p-2 rounded-md w-full"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <span>-</span>
          <input
            type="time"
            className="border p-2 rounded-md w-full"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={allDay}
            onChange={() => setAllDay(!allDay)}
            className="mr-2"
          />
          All day
        </label>
      </div>
      <div className="mt-4 space-y-2">
        <button className="w-full flex items-center p-2 border rounded-md text-gray-600">
          <FaUser className="mr-2" /> Add guests
        </button>
        <button className="w-full flex items-center p-2 border rounded-md text-gray-600">
          <FaVideo className="mr-2" /> Add Google Meet video conferencing
        </button>
        <button className="w-full flex items-center p-2 border rounded-md text-gray-600">
          <FaMapMarkerAlt className="mr-2" /> Add location
        </button>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button className="text-gray-600 flex items-center">
          <FiMoreHorizontal size={20} /> More options
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
      </div>
    </div>
  );
}
