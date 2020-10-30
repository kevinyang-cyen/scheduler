import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
     })
  }, []);

  let appointments = getAppointmentsForDay(state, state.day);
  let interviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview, callback, errCallback) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(res => {
        setState({
          ...state,
          appointments
        });
        callback();
      })
      .catch(err => errCallback());

  }

  function deleteInterview(id, callback, errCallback) {
    axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(res => {
        callback();
      })
      .catch(err => errCallback());

  }

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview = {bookInterview}
        deleteInterview = {deleteInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
