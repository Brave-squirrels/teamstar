import React from "react";
import styles from "./main.module.scss";
interface Props {
  children: any;
}

const main = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default main;
