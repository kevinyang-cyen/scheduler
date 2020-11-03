import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
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

  function bookInterview(id, interview, callback, errCallback) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let dayId = 0;
    for (const day in state.days) {
      if (state.days[day].name === state.day) {
        dayId = day;
      }
    }

    axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(res => {
        const days = state.days;
        days[dayId].spots -= 1;
        setState({
          ...state,
          appointments
        });
        callback();
      })
      .catch(err => errCallback());

  }

  function deleteInterview(id, callback, errCallback) {
    let dayId = 0;
    for (const day in state.days) {
      if (state.days[day].name === state.day) {
        dayId = day;
      }
    }
    axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(res => {
        const days = state.days;
        days[dayId].spots += 1;
        setState({
          ...state
        })
        callback();
      })
      .catch(err => errCallback());

  }

  return {state, setDay, bookInterview, deleteInterview};
}