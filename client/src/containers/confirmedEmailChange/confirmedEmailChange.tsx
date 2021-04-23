import React from "react";

import { Button } from "react-bootstrap";
import { Layout } from "hoc/layout/layout";

import styles from "./confirmedEmailChange.module.scss";

const confirmedEmailChange = () => {
  return (
    <Layout>
      <div className={styles.innerWrapper}>
        <p>Your email has been successfully changed!</p>
        <a href="/">
          <Button> Log In </Button>
        </a>
      </div>
    </Layout>
  );
};

export default confirmedEmailChange;
