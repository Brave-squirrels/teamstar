import React from "react";

import styles from "./lateHour.module.scss";

const lateHour = (props: any) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>Time for work is over!</div>
      <div className={styles.text}>Come back at {props.time}</div>
    </div>
  );
};

export default lateHour;
