import React from "react";
import PropTypes from 'prop-types';

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList({interviewers, interviewer, setInterviewer}) {
  const interviewerSelect = interviewers.map((person) => {
    return (
      <InterviewerListItem
      key = {person.id}
      name = {person.name}
      avatar = {person.avatar}
      selected = {person.id === interviewer}
      setInterviewer={event => setInterviewer(person.id)}
    />
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerSelect}
      </ul>
    </section>
  );
}


InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;