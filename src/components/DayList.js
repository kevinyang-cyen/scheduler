import React from "react";
import DayListItem from "./DayListItem"

// renders the list of days on side bar
export default function DayList({day, setDay, days}) {
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