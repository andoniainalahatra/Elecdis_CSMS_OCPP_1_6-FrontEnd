import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";
import {
  filterDateForAllRevenu,
  filterDateForAllSession,
  filterDateForEnergy,
  filterDateForNewUser,
} from "../content/T_BORD/features/filterCalendarSlice";
import ButttonFilterDate from "./ButttonFilterDate";

function CalendarFilter({ filter, type }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(type);
  const dispatch = useDispatch();
  const calendarRef = useRef(null);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const formatDate = (date, view) => {
    if (view === "decade" || type === "decade") {
      return date.getFullYear().toString();
    } else if (view === "year" || type === "year") {
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
    } else {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  };

  const handleDateChange = (date) => {
    console.log(
      `handleDateChange called with date: ${date}, view: ${currentView}`
    );

    const formattedDate = formatDate(date, currentView);
    console.log(`Formatted date: ${formattedDate}`);

    let actionCreator;
    if (filter === "nombreSession") {
      actionCreator = filterDateForAllSession;
    } else if (filter === "energyDelivery") {
      actionCreator = filterDateForEnergy;
    } else if (filter === "revenu") {
      actionCreator = filterDateForAllRevenu;
    } else if (filter === "newClient") {
      actionCreator = filterDateForNewUser;
    }

    if (actionCreator) {
      console.log(`Dispatching action: ${actionCreator.name}`);
      dispatch(actionCreator(formattedDate));
    } else {
      console.warn(`No action creator found for filter: ${filter}`);
    }

    setSelectedDate(date);
    setTimeout(() => {
      setCurrentView((prevView) => prevView);
    }, 0);

    console.log(`New selected date: ${date}`);
  };

  const handleViewChange = (view) => {
    console.log(`View changed to: ${view}`);
    setCurrentView(view);
    if (view === "year") {
      handleDateChange(new Date(), view);
    }
  };

  const handleActiveStartDateChange = ({ activeStartDate, view }) => {
    console.log(`Active start date changed: ${activeStartDate}, view: ${view}`);
    if ((view === "decade" || view === "year") && activeStartDate) {
      handleDateChange(activeStartDate, view);
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

  console.log(
    `Rendering CalendarFilter with type: ${type}, filter: ${filter}, showCalendar: ${showCalendar}`
  );

  return (
    <div className="relative">
      <button onClick={toggleCalendar} className="text-xl">
        {type === "month" && <ButttonFilterDate text="J" />}
        {type === "year" && <ButttonFilterDate text="M" />}
        {type === "decade" && <ButttonFilterDate text="A" />}
      </button>
      {showCalendar && (
        <div
          className="calendar-container absolute z-50 -right-24 transition-opacity duration-300 ease-in-out opacity-100"
          ref={calendarRef}
        >
          <Calendar
            onChange={handleDateChange}
            onViewChange={handleViewChange}
            onActiveStartDateChange={handleActiveStartDateChange}
            value={selectedDate}
            view={currentView}
            className="bg-gray-100 p-4 border-none rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}

export default CalendarFilter;
