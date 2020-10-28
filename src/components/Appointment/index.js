import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
   return ( props.interview ? 
      <article className="appointment">
        <Header time={props.time} />
        <Show interview={props.interview} student={props.interview.student} interviewer={props.interview.interviewer}/>
      </article>
    :
      <article className="appointment">
      <Header time={props.time}/>
      <Empty />
      </article>
   );
 }