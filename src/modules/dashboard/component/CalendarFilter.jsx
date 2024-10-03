import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { FaCalendarAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { filterDateForAllRevenu, filterDateForAllSession, filterDateForEnergy, filterDateForNewUser } from '../content/T_BORD/features/filterCalendarSlice';

function CalendarFilter({filter}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    if(filter === "nombreSession"){
      dispatch(filterDateForAllSession(formattedDate))
    }
    if(filter === "energyDelivery"){
      dispatch(filterDateForEnergy(formattedDate))
    }
    if(filter === "revenu"){
      dispatch(filterDateForAllRevenu(formattedDate))
    }
    if(filter === "newClient"){
      dispatch(filterDateForNewUser(formattedDate))
    }
    setSelectedDate(formattedDate);

  };

  return (
    <div className="relative">
      <button onClick={toggleCalendar} className="text-xl">
        <FaCalendarAlt size={30} color='#d3d8de' />
      </button>
      {showCalendar && (
        <div className="calendar-container absolute z-50 -right-2">
          <Calendar
          view="decade"
            onChange={handleDateChange}
            value={selectedDate}
            className="bg-gray-100 p-4 border-none rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}

export default CalendarFilter;
