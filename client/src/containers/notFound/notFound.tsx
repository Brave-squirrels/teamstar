import React from "react";
import { Layout } from "hoc/layout/layout";
import styles from "./notFound.module.scss";

const notFound = () => {
  return (
    <Layout>
      <div className={styles.innerWrapper}>
        <h1>Site Not Found</h1>
      </div>
    </Layout>
  );
};

export default notFound;
