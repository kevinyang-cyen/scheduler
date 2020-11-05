import React from "react";

import "components/DayListItem.scss";
import classNames from 'classnames/bind';

// renders the number of spots remaining fo the day
export default function DayListItem({spots, selected, name, setDay}) {
  const formatSpots = function() {
    if (!spots) {
      return "no spots remaining";
    }
    else if (spots === 1) {
      return "1 spot remaining";
    }
    else {
      return `${spots} spots remaining`
    }
  }

  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  })
  return (
    <li className={dayListItemClass} onClick={() => setDay(name)} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}