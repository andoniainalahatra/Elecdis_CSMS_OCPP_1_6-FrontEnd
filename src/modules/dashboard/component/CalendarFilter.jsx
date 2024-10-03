import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { FaCalendarAlt } from 'react-icons/fa';

function CalendarFilter() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="relative">
      <button onClick={toggleCalendar} className="text-xl p-2">
        <FaCalendarAlt size={30} color='#d3d8de' />
      </button>
      {showCalendar && (
        <div className="calendar-container absolute z-50 -right-2">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="bg-gray-100 p-4 border-none rounded-lg shadow-md"
          />
        </div>
      )}

    </div>
  );
}

export default CalendarFilter;
