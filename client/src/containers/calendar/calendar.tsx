import React, { Children, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Button } from "react-bootstrap";

import FormStructure from "containers/form/formStructure";
import MyVerticallyCenteredModal from "containers/user/settings/MyVerticallyCenteredModal";

import { teamDataFetch } from "reduxState/team/getTeamInfo";
import { getCalendarFetch } from "reduxState/calendar/getCalendar";
import { addEventFetch } from "reduxState/calendar/addEvent";
import { deleteEventFetch } from "reduxState/calendar/deleteEvent";
import { editEventFetch } from "reduxState/calendar/editEvent";

import { mutateToAxios } from "utils/onChangeForm";

import styles from "./calendar.module.scss";
import { RootState } from "reduxState/store";

const localizer = momentLocalizer(moment);

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
  const [currentEvent, setCurrentEvent] = useState({
    author: { id: "", name: "" },
    _id: "",
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const teamData = useSelector((state: RootState) => state.teamData);
  const calendarEvents = useSelector(
    (state: RootState) => state.getCalendar.calendarData.events
  );
  const createState = useSelector((state: RootState) => state.addEvent);
  const deleteState = useSelector((state: RootState) => state.deleteEvent);
  const editState = useSelector((state: RootState) => state.editEvent);
  const teamId = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(teamDataFetch(teamId));
  }, [dispatch, teamId, createState.success, editState.success]);
  useEffect(() => {
    if (teamData.teamData!.calendarId) {
      dispatch(getCalendarFetch(teamData!.teamData!.calendarId));
    }
  }, [teamData, editState.success, dispatch]);

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
    desc: {
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
      valid: true,
    },
    desc: {
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
      valid: true,
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
      valid: true,
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
      valid: true,
    },
    fromHour: {
      val: "",
      inputType: "input",
      type: "text",
      placeholder: "Start",
      label: "Start",
      validation: {
        required: true,
      },
      error: `Should be between 2 and 5 characters long`,
      touched: false,
      valid: true,
    },
    toHour: {
      val: "",
      inputType: "input",
      type: "text",
      placeholder: "End",
      label: "End",
      validation: {
        required: true,
      },
      error: `Should be between 2 and 5 characters long`,
      touched: false,
      valid: true,
    },
    formValid: true,
  });

  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addEventFetch(mutateToAxios(newEvent), teamData!.teamData?.calendarId)
    );
  };

  const handleSingleEventCLick = (e: any) => {
    console.log(e);
    setShowCurrentEvent(true);
    setCurrentEvent(e);
    setAuthor(e.author.name);
    setEditEvent((prevState) => {
      return {
        ...prevState,
        title: {
          ...prevState.title,
          val: e.title,
        },
        desc: {
          ...prevState.desc,
          val: e.desc,
        },
        start: {
          ...prevState.start,
          val: e.start.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0],
        },
        end: {
          ...prevState.end,
          val: e.end.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0],
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
    dispatch(
      editEventFetch(
        mutateToAxios(editEvent),
        teamData!.teamData?.calendarId,
        currentEvent._id
      )
    );
  };

  const handleDeleteEvent = (e: any) => {
    dispatch(deleteEventFetch(teamData.teamData?.calendarId, currentEvent._id));
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
          spinner={createState.loading}
        />
      </MyVerticallyCenteredModal>
      <MyVerticallyCenteredModal
        show={showCurrentEvent}
        onHide={() => setShowCurrentEvent(false)}
        title={"Current event"}
      >
        {currentEvent.author.id === localStorage.getItem("id") ? (
          <>
            <div className={styles.authorContainer}>
              <span className={styles.authInnerCon}>
                Author: <span className={styles.author}>{author} </span>
              </span>
              {deleteState.loading ? (
                <Spinner
                  animation="border"
                  style={{
                    color: "rgba(126, 203, 207, 1)",
                  }}
                />
              ) : (
                <span className={styles.delete} onClick={handleDeleteEvent}>
                  Delete
                </span>
              )}
            </div>
            <FormStructure
              state={editEvent}
              setState={setEditEvent}
              btnText="EDIT"
              title=""
              submitted={handleEditEvent}
              spinner={editState.loading}
            />
          </>
        ) : (
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
              <span className={styles.content}>{editEvent.desc.val}</span>
            </div>
            <div>
              <span className={styles.title}>Start date</span>
              <span className={styles.content}>
                {editEvent.start.val.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
              </span>
            </div>
            <div>
              <span className={styles.title}>End date</span>
              <span className={styles.content}>
                {editEvent.end.val.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
              </span>
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
        )}
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
          events={calendarEvents}
          components={{
            dateCellWrapper: ColoredDateCellWrapper,
          }}
        />
      </div>
    </>
  );
};

export default CalendarComponent;
