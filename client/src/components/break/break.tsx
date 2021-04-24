import React from "react";

import styles from "./break.module.scss";

const Break = (props: any) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>Break till: {props.break}</div>
    </div>
  );
};

export default Break;
