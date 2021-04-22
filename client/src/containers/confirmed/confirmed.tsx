import React from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Particle } from "components/particle/particle";

import styles from "./confirmed.module.scss";

const confirmed = () => {
  return (
    <div className={styles.wrapper}>
      <Particle />
      <div className={styles.innerWrapper}>
        <Link to="/">
          <Button> Main page </Button>
        </Link>
      </div>
    </div>
  );
};

export default confirmed;
