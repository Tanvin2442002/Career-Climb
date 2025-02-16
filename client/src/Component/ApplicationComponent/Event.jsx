import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

export default function EventModal({ data, setPopupVisible, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2025-02-12");
  const [startTime, setStartTime] = useState("20:00");
  const [endTime, setEndTime] = useState("21:00");
  const [allDay, setAllDay] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState([{ email: "" }]);
  const [reminders, setReminders] = useState([
    { method: "email", minutes: 24 * 60 },
    { method: "popup", minutes: 10 },
  ]);

  const isFormValid =
    title &&
    date &&
    startTime &&
    endTime &&
    description &&
    location &&
    guests.every((guest) => guest.email) &&
    reminders[0]?.minutes &&
    reminders[1]?.minutes;

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
  var gapi = window.gapi;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = () => {
    if (!window.google || !window.google.accounts) {
      console.error("Google Identity Services not loaded");
      return;
    }
  
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: "https://www.googleapis.com/auth/calendar.events",
      callback: (tokenResponse) => {
        if (tokenResponse.access_token) {  
          gapi.load("client", async () => {
            try {
              await gapi.client.init({
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
              });
  
  
              gapi.client.setToken({ access_token: tokenResponse.access_token });
  
              const event = {
                summary: title,
                location: location,
                description: description,
                start: {
                  dateTime: `${date}T${startTime}:00+06:00`,
                  timeZone: "Asia/Dhaka",
                },
                end: {
                  dateTime: `${date}T${endTime}:00+06:00`,
                  timeZone: "Asia/Dhaka",
                },
                attendees: guests
                  .filter((guest) => guest.email)
                  .map((guest) => ({ email: guest.email })),
                reminders: {
                  useDefault: false,
                  overrides: reminders,
                },
              };
  
              const response = await gapi.client.calendar.events.insert({
                calendarId: "primary",
                resource: event,
              });
  
              console.log("Event created successfully:", response);
              onSave();
              setPopupVisible(false);
            } catch (error) {
              console.error("Error creating event:", error);
            }
          });
        }
      },
    });
  
    tokenClient.requestAccessToken();
  };
  


  const addGuest = () => {
    setGuests([...guests, { email: "" }]);
  };

  const handleGuestChange = (index, event) => {
    const updatedGuests = guests.map((guest, i) =>
      i === index ? { ...guest, email: event.target.value } : guest
    );
    setGuests(updatedGuests);
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 relative h-[60vh] overflow-y-auto">
      <button
        className="absolute top-2 right-2 text-gray-500"
        onClick={() => setPopupVisible(false)}
      >
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
        <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md">
          Event
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

      <div className="mt-4">
        <textarea
          placeholder="Add description"
          className="w-full border p-2 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Add location"
          className="w-full border p-2 rounded-md"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-lg">Guests</h3>
        {guests.map((guest, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="email"
              className="w-full border p-2 rounded-md"
              placeholder="Guest email"
              value={guest.email}
              onChange={(e) => handleGuestChange(index, e)}
            />
          </div>
        ))}
        <button type="button" className="text-blue-500 mt-2" onClick={addGuest}>
          + Add another guest
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-lg">Reminders</h3>
        <div className="flex space-x-2">
          <div>
            <label className="block">Email Reminder</label>
            <input
              type="number"
              className="w-full border p-2 rounded-md"
              placeholder="Minutes before"
              value={reminders[0]?.minutes}
              onChange={(e) => {
                const newReminders = [...reminders];
                newReminders[0].minutes = e.target.value;
                setReminders(newReminders);
              }}
            />
          </div>
          <div>
            <label className="block">Popup Reminder</label>
            <input
              type="number"
              className="w-full border p-2 rounded-md"
              placeholder="Minutes before"
              value={reminders[1]?.minutes}
              onChange={(e) => {
                const newReminders = [...reminders];
                newReminders[1].minutes = e.target.value;
                setReminders(newReminders);
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          className={`bg-blue-600 text-white px-4 py-2 rounded-md ${
            !isFormValid ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleClick}
          disabled={!isFormValid}
        >
          Save
        </button>
      </div>
    </div>
  );
}
