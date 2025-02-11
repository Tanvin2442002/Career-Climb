import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { generateDate, months } from "./GenerateDate";
import cn from "./cn";
import { motion } from "framer-motion";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { supabase } from "../../Auth/SupabaseClient";


export default function Calendar( {setClickeddate} ) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  const [sessions, setSessions] = useState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("Session from getSession:", data.session);
      setSessions(data.session);
    });
  }, []);

  console.log(sessions);


  const updateCalender = async () => {
    const event = {
      'summary': 'Project Meeting',
      'description': 'Meeting with the team, to discuss the project and the progress. Also, to discuss the future plans and the roadmap. Make sure to attend the meeting.',
      'start': {
      'dateTime': selectDate.toDate().toISOString(),
      'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      'end': {
      'dateTime': dayjs(selectDate).add(2, 'hour').toDate().toISOString(),
      'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    }

    await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessions.provider_token}`
      },
      body: JSON.stringify(event)
    }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="flex flex-col items-center gap-6 sm:w-3/4 mx-auto px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="select-none font-semibold text-lg">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-4 items-center">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="cursor-pointer hover:scale-105 transition-all text-sm"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <h1
              key={index}
              className="text-sm text-center h-10 w-10 grid place-content-center text-gray-500 select-none"
            >
              {day}
            </h1>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => (
              <div
                key={index}
                className="p-2 text-center h-14 grid place-content-center text-sm border-t"
              >
                <h1
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-red-600 text-white" : "",
                    selectDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                      ? "bg-black text-white"
                      : "",
                    "h-6 w-6 sm:h-8 sm:w-8 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                  )}
                  onClick={() => {
                    setSelectDate(date);
                    setClickeddate(date);
                  }}
                >
                  {date.date()}
                </h1>
              </div>
            )
          )}
        </div>
      </div>
      <div className="w-full text-center mt-4">
        <h1 className="font-semibold text-lg">
          Schedule for {selectDate.toDate().toDateString()}
        </h1>
        <p className="text-gray-400 mt-2">No meetings for today.</p>
        {sessions && (
          <div>
            <h1>
              Creating a meeting for {selectDate.toDate().toDateString()}
            </h1>
            <button onClick={updateCalender}>Create Meeting</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
