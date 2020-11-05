import React from "react";

import "components/InterviewerListItem.scss";
import classNames from 'classnames/bind';

// renders the interviewer image and name (if clicked on)
export default function InterviewerListItem({selected, setInterviewer, avatar, name}) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  })

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}