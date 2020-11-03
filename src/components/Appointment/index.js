import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode.js";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  function save(name, interviewer) {
    transition("SAVING");
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview, function(){ transition("SHOW") }, function(){ transition("ERROR_SAVE") });
  }

  function editSave(name, interviewer) {
    transition("SAVING");
    const interview = {
      student: name,
      interviewer
    };
    props.editInterview(props.id, interview, function(){ transition("SHOW") }, function(){ transition("ERROR_SAVE") });
  }

  function trash() {
    transition("DELETING");
    props.deleteInterview(props.id, function(){ transition("EMPTY") }, function(){ transition("ERROR_DELETE", true) });
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
            onEdit={() => transition("EDIT")}
          />
        )}
        {mode === EDIT && <Form name = {props.interview.student} interviewer = {props.interview.interviewer.id} interviewers = {props.interviewers} onCancel= {() => back()} onSave= {editSave}/>}
        {mode === CONFIRM && <Confirm message = "Are you sure you would like to delete?" onCancel={() => back()} onConfirm={() => trash()}/>}
        {mode === CREATE && <Form interviewers = {props.interviewers} onCancel= {() => back()} onSave= {save}/>}
        {mode === SAVING && <Status message = "Saving"/>}
        {mode === DELETING && <Status message = "Deleting"/>}
        {mode === ERROR_SAVE && <Error message = "Could not book appointment." onClose = {() => back()}/>}
        {mode === ERROR_DELETE && <Error message = "Could not cancel appointment." onClose= {() => back()}/>}
      </article>
   );
 }