import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";
import {
  filterDateForBox,
  filterDateForNewUser
} from "../content/T_BORD/features/filterCalendarSlice";
import ButttonFilterDate from "./ButttonFilterDate";

function CalendarFilterDay({ filter, className = "" }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();
  const calendarRef = useRef(null);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    
  };
  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    let actionCreator;
    if (filter === "newClient") {
      actionCreator = filterDateForNewUser;
    } else{
      actionCreator = filterDateForBox;
    }

    if (actionCreator) {
      dispatch(actionCreator(formattedDate));
      setSelectedDate(date)
    } else {
      console.warn(`No action creator found for filter: ${filter}`);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="relative">
      <button onClick={toggleCalendar} className="text-xl">
        <ButttonFilterDate text="Jour" />
      </button>
      {showCalendar && (
        <div
          className={`${className} calendar-container absolute z-50 -right-30 top-10 transition-opacity duration-300 ease-in-out opacity-100`}
          ref={calendarRef}
        >
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            view="month"
            className="bg-gray-100 z-50 p-[.2vw] border-none rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}

export default CalendarFilterDay;
