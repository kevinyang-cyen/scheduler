import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode.js";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  function save(name, interviewer) {
    transition("SAVING");
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview, function(){ transition("SHOW") });
  }

  function trash() {
    transition("DELETING");
    props.deleteInterview(props.id, function(){ transition("EMPTY") });
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
   return (
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition("CONFIRM")}
          />
        )}
        {mode === CONFIRM && <Confirm message = "Are you sure you would like to delete?" onCancel={() => transition("SHOW")} onConfirm={() => trash()}/>}
        {mode === CREATE && <Form interviewers = {props.interviewers} onCancel= {() => back()} onSave= {save}/>}
        {mode === SAVING && <Status message = "Saving"/>}
        {mode === DELETING && <Status message = "Deleting"/>}
      </article>
   );
 }