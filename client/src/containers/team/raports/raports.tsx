import styles from "./raports.module.scss";
import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "reduxState/store";

const Raports = (props: any) => {
  const raports = useSelector(
    (state: RootState) => state.getRaports.raportData
  );
  return (
    <div className={styles.wrapper}>
      {raports.length > 0 && (
        <>
          {raports.map((raport: any) => (
            <div className={styles.container}>
              <div>{raport.name}</div>
              <div>{raport.author.name}</div>
              <p>{raport.description}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Raports;
