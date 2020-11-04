import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, 
  getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";


afterEach(cleanup);

describe("Appointment", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
  
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
  
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Lydia Miller-Jones")
    );
  
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Replace the existing target value with "Kevin Yang", then press "save"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Kevin Yang" }
    });
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
  
    fireEvent.click(getByText(appointment, "Save"));

    // 5. Checking if "Saving" phase is showing up
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
    // 6. Checking if "Kevin Yang" now has an interview
    await waitForElement(() => getByText(appointment, "Kevin Yang"));
  });

  it("shows the save error when failing to save an appointment", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Kevin Yang" is displayed.
    await waitForElement(() => getByText(container, "Kevin Yang"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Kevin Yang")
    );
  
    // 3. Click on the "Edit" Button
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Press the "Save" Button
    axios.put.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, "Save"));

    // 5. Check that "Saving" is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 6. Check that "Could not book appointment" is displayed
    await waitForElement(() => getByText(container, "Could not book appointment."));
    expect(getByText(appointment, "Could not book appointment.")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an appointment", async () => {
     // 1. Render the Application.
     const { container } = render(<Application />);
  
     // 2. Wait until the text "Kevin Yang" is displayed.
     await waitForElement(() => getByText(container, "Kevin Yang"));
   
     // 3. Click the "Delete" button on the booked appointment.
     const appointment = getAllByTestId(container, "appointment").find(
       appointment => queryByText(appointment, "Kevin Yang")
     );
   
     fireEvent.click(queryByAltText(appointment, "Delete"));
   
     // 4. Check that the confirmation message is shown.
     expect(
       getByText(appointment, "Are you sure you would like to delete?")
     ).toBeInTheDocument();
   

     // 5. Click the "Confirm" button on the confirmation.
     axios.delete.mockRejectedValueOnce();
     fireEvent.click(queryByText(appointment, "Confirm"));
   
     // 6. Check that the element with the text "Deleting" is displayed.
     expect(getByText(appointment, "Deleting")).toBeInTheDocument();

     // 7. Check that "Could not cancel appointment." is displayed
     await waitForElement(() => getByText(container, "Could not cancel appointment."));
    expect(getByText(appointment, "Could not cancel appointment.")).toBeInTheDocument();
  });
});


