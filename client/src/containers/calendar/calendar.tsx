import React, { Children, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Button } from "react-bootstrap";

import FormStructure from "containers/form/formStructure";
import MyVerticallyCenteredModal from "containers/user/settings/MyVerticallyCenteredModal";

import { teamDataFetch } from "reduxState/team/getTeamInfo";

import styles from "./calendar.module.scss";
import { RootState } from "reduxState/store";

const localizer = momentLocalizer(moment);

const events: any = [
  {
    id: 14,
    title: "Today",
    start: Date.now(),
    end: Date.now(),
    author: "Sample author",
    description: "xD",
    fromHour: "18:00",
    toHour: "22:00",
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
  const [author, setAuthor] = useState("");
  const [currentEvent, setCurrentEvent] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  /* const teamData = useSelector((state: RootState) => state.teamData); */
  const teamId = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(teamDataFetch(teamId));
  }, [dispatch, teamId]);

  const [showNewEvent, setShowNewEvent] = useState(false);
  const [showCurrentEvent, setShowCurrentEvent] = useState(false);
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
    fromHour: {
      val: "",
      inputType: "input",
      type: "text",
      placeholder: "Start",
      label: "Start",
      validation: {
        required: false,
        minLength: 2,
        maxLength: 5,
      },
      error: `Should be between 2 and 5 characters long`,
      touched: true,
      valid: true,
    },
    toHour: {
      val: "",
      inputType: "input",
      type: "text",
      placeholder: "End",
      label: "End",
      validation: {
        required: false,
        minLength: 2,
        maxLength: 5,
      },
      error: "Should be between 2 and 5 characters long",
      touched: true,
      valid: true,
    },
    formValid: false,
  });

  const [editEvent, setEditEvent] = useState({
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
    fromHour: {
      val: "",
      inputType: "input",
      type: "text",
      placeholder: "Start",
      label: "Start",
      validation: {
        required: true,
        minDate: Date.now(),
      },
      error: `You can't pick previous date`,
      touched: false,
      valid: false,
    },
    toHour: {
      val: "",
      inputType: "input",
      type: "text",
      placeholder: "End",
      label: "End",
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

  const handleSingleEventCLick = (e: any) => {
    setShowCurrentEvent(true);
    setCurrentEvent(e.id);
    setAuthor(e.author);
    setEditEvent((prevState) => {
      return {
        ...prevState,
        title: {
          ...prevState.title,
          val: e.title,
        },
        description: {
          ...prevState.description,
          val: e.description,
        },
        start: {
          ...prevState.start,
          val: e.start,
        },
        end: {
          ...prevState.end,
          val: e.end,
        },
        fromHour: {
          ...prevState.fromHour,
          val: e.fromHour,
        },
        toHour: {
          ...prevState.toHour,
          val: e.toHour,
        },
      };
    });
    console.log(e);
  };

  const handleEditEvent = (e: any) => {
    e.preventDefault();
  };

  const handleDeleteEvent = (e: any) => {};

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
      <MyVerticallyCenteredModal
        show={showCurrentEvent}
        onHide={() => setShowCurrentEvent(false)}
        title={"Current event"}
      >
        <div className={styles.containerUser}>
          <div>
            <span className={styles.authInnerCon}>
              Author: <span className={styles.author}>{author} </span>
            </span>
          </div>
          <div>
            <span className={styles.title}>Title</span>
            <span className={styles.content}>{editEvent.title.val}</span>
          </div>
          <div>
            <span className={styles.title}>Description</span>
            <span className={styles.content}>{editEvent.description.val}</span>
          </div>
          <div>
            <span className={styles.title}>Start date</span>
            <span className={styles.content}>{editEvent.start.val}</span>
          </div>
          <div>
            <span className={styles.title}>End date</span>
            <span className={styles.content}>{editEvent.end.val}</span>
          </div>
          <div>
            <span className={styles.title}>From</span>
            <span className={styles.content}>{editEvent.fromHour.val}</span>
          </div>
          <div>
            <span className={styles.title}>To</span>
            <span className={styles.content}>{editEvent.toHour.val}</span>
          </div>
        </div>
        {/* Form if owner or creator - info if normal guy
        <div className={styles.authorContainer}>
          <span className={styles.authInnerCon}>
            Author: <span className={styles.author}>{author} </span>
          </span>
          <span className={styles.delete} onClick={handleDeleteEvent}>
            Delete
          </span>
        </div>
        <FormStructure
          state={editEvent}
          setState={setEditEvent}
          btnText="EDIT"
          title=""
          submitted={handleEditEvent}
        /> */}
      </MyVerticallyCenteredModal>
      <Button className={styles.addBtn} onClick={() => setShowNewEvent(true)}>
        New event
      </Button>
      <div className={styles.wrapper}>
        <Calendar
          selectable
          onSelectEvent={(event) => handleSingleEventCLick(event)}
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
