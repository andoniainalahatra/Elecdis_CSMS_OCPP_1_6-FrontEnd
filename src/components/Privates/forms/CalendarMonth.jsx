import { Input } from '@/components/ui/input';
import { useAddClient } from '@/modules/dashboard/content/ACTIVITE/config/Api/AdminApi';
import { selectFilterCalendarTable } from '@/modules/dashboard/content/T_BORD/features/filterCalendarSelector';
import { filterDateForClientTable } from '@/modules/dashboard/content/T_BORD/features/filterCalendarSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CalendarMonth = ({ filter }) => {
  const dispatch = useDispatch();
  let actionCreator;

  if (filter === "filterClientTable") {
    actionCreator = filterDateForClientTable;
  }
  
  const handleClick=(e)=>{
    var date=e.target.value
    dispatch(filterDateForClientTable(date))
  }
  
  const actualDate=useSelector(selectFilterCalendarTable)

  return (
    <div>
      <Input
      className="bg-slate-200 font-semibold border-none outiline-none focus-visible:ring-0"
        type="month"
        value={actualDate}
        onChange={(e)=>{handleClick(e)}}
      />
    </div>
  );
};

export default CalendarMonth;
