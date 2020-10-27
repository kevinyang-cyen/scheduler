import React from "react";
import DayListItem from "./DayListItem"

export default function DayList({day, setDay, days}) {
  // days.forEach(day => console.log(day.name));
  // console.log(name);
  return (
    <ul>
        {days.map((weekDay) => <DayListItem 
        key = {weekDay.id}
        name={weekDay.name}
        spots= {weekDay.spots}
        selected= {weekDay.name === day}
        setDay = {setDay} />)}
    </ul>
  );
}