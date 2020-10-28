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