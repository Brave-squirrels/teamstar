import React from "react";
import { Particle } from "components/particle/particle";
import styles from "./layout.module.scss";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Particle />
      {children}
    </div>
  );
};
