import React from "react";

import "components/InterviewerListItem.scss";
import classNames from 'classnames/bind';

export default function InterviewerListItem({id, name, avatar, selected, setInterviewer}) {
  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  })

  return (
    <li className={interviewerListItemClass} onClick={() => setInterviewer(name)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {name}
    </li>
  );
}