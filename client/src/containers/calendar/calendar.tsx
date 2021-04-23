import React, { Children } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

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

const calendar = () => {
  return (
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
  );
};

export default calendar;
