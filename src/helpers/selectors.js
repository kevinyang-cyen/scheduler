export function getAppointmentsForDay(state, day) {
  const appArray = [];
  for (const item of state.days) {
    if (item.name === day) {
      for (const app of item.appointments) {
        appArray.push(state.appointments[app]);
      }
    }
  }
  return appArray;
}

export function getInterview(state, interview) {
  let returnObj = null;
  if (!interview) {
    return returnObj;
  }
  for (const person in state.interviewers) {
    if (parseInt(person) === interview.interviewer) {
      returnObj = {student: interview.student, interviewer: state.interviewers[person]};
    }
  }
  return returnObj;
}

export function getInterviewersForDay(state, day) {
  const interviewersArray = [];
  for (const item of state.days) {
    if (item.name === day) {
      for (const app of item.appointments) {
        if (state.appointments[app].interview && !interviewersArray.includes(state.interviewers[state.appointments[app].interview.interviewer])) {
          interviewersArray.push(state.interviewers[state.appointments[app].interview.interviewer]);
        }
      }
    }
  }
  console.log(interviewersArray);
  return interviewersArray;
}