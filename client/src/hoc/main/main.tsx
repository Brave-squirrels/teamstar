import React from "react";
import styles from "./main.module.scss"
interface Props {
  children: JSX.Element | JSX.Element[];
}

const main = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default main;
