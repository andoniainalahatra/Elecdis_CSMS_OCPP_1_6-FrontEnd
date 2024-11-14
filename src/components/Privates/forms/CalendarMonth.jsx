import { Input } from '@/components/ui/input'
import { filterDateForClientTable } from '@/modules/dashboard/content/T_BORD/features/filterCalendarSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
//import { filterDateForClientTable } from '@/modules/dashboard/content/T_BORD/features/filterCalendarSlice';
//import React, { useState } from 'react'
 const CalendarMonth=({filter})=>{
let actionCreator;
const dispatch = useDispatch();
const [month,setMonth]=useState(new Date().getMonth())
const [year,setYear]=useState(new Date().getFullYear())
const formattedDate=`${year}-${month}`
if(filter==="filterClientTable"){
    actionCreator=filterDateForClientTable
}
if(actionCreator){
    dispatch(actionCreator(formattedDate))
}
// console.log("mois:",month);
// console.log("year:",year);
// console.log(formattedDate)

  return (
    <div>
        <Input type="Month" onChange={(e)=>{
            let date=e.target.value.split("-")
            setMonth(date[1])
            setYear(date[0])
        }} />
    </div>
  )
}
export default CalendarMonth;
