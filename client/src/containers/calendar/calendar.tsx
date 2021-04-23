import React, { Children, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Button } from "react-bootstrap";

import FormStructure from "containers/form/formStructure";
import MyVerticallyCenteredModal from "containers/user/settings/MyVerticallyCenteredModal";

import styles from "./calendar.module.scss";

const localizer = momentLocalizer(moment);

const events: any = [
  {
    id: 14,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
];

const CURRENT_DATE = moment().toDate();

const ColoredDateCellWrapper = ({ children, value }: any) =>
  React.cloneElement(Children.only(children), {
    style: {
      ...children.style,
      backgroundColor: value < CURRENT_DATE ? "#f3f9f6aa" : "#f3f9f6",
    },
  });

const CalendarComponent = () => {
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: {
      val: "",
      type: "text",
      inputType: "input",
      placeholder: "Title",
      label: "Title",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 24,
      },
      error: "Title should be between 3 and 24 characters long",
      touched: false,
      valid: false,
    },
    description: {
      val: "",
      inputType: "textarea",
      placeholder: "Description",
      label: "Description",
      validation: {
        required: false,
        minLength: 0,
        maxLength: 255,
      },
      error: "Description should can't be longer than 255 characters",
      touched: false,
      valid: false,
    },
    start: {
      val: "",
      inputType: "input",
      type: "date",
      placeholder: "Start date",
      label: "Start date",
      validation: {
        required: true,
        minDate: Date.now(),
      },
      error: `You can't pick previous date`,
      touched: false,
      valid: false,
    },
    end: {
      val: "",
      inputType: "input",
      type: "date",
      placeholder: "End date",
      label: "End date",
      validation: {
        required: true,
        minDate: Date.now(),
      },
      error: `You can't pick previous date`,
      touched: false,
      valid: false,
    },
    formValid: false,
  });

  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={showNewEvent}
        onHide={() => setShowNewEvent(false)}
        title={"Add new event"}
      >
        <FormStructure
          state={newEvent}
          setState={setNewEvent}
          btnText="ADD"
          title=""
          submitted={handleCreateEvent}
        />
      </MyVerticallyCenteredModal>
      <Button className={styles.addBtn} onClick={() => setShowNewEvent(true)}>
        New event
      </Button>
      <div className={styles.wrapper}>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          events={events}
          components={{
            dateCellWrapper: ColoredDateCellWrapper,
          }}
        />
      </div>
    </>
  );
};

export default CalendarComponent;
