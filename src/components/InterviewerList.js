import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList({interviewers, interviewer, setInterviewer}) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(person =>  <InterviewerListItem
          key = {person.id}
          name = {person.name}
          avatar = {person.avatar}
          selected = {person.id === interviewer}
          setInterviewer = {setInterviewer}
        />)}
      </ul>
    </section>
  );
}