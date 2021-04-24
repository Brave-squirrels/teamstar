import React from "react";

import { Button } from "react-bootstrap";
import { Layout } from "hoc/layout/layout";

import styles from "./confirmed.module.scss";

const confirmed = () => {
  return (
    <Layout>
      <div className={styles.innerWrapper}>
        <p>Your email has been successfully confirmed!</p>
        <a href="/">
          <Button> Log In </Button>
        </a>
      </div>
    </Layout>
  );
};

export default confirmed;
