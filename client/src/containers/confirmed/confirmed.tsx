import React from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Layout } from "hoc/layout/layout";

import styles from "./confirmed.module.scss";

const confirmed = () => {
  return (
    <Layout>
      <div className={styles.innerWrapper}>
        <p>Your email has been succesfully confirmed!</p>
        <Link to="/">
          <Button> Log In </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default confirmed;
