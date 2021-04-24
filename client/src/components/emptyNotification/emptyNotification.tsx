import React from "react";

import styles from "./emptyNotification.module.scss";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const emptyNotification = (props: Props) => {
  return <div className={styles.notification}>{props.children}</div>;
};

export default emptyNotification;
