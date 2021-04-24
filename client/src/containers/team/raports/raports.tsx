import styles from "./raports.module.scss";
import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "reduxState/store";

const Raports = (props: any) => {
  const raports = useSelector(
    (state: RootState) => state.getRaports.raportData
  );
  const user = useSelector((state: RootState) => state.loginUser);
const dupa = () => console.log(user)
  return (
    <div className={styles.wrapper}>
      {raports.length > 0 && (
        <>
          {raports.map((raport: any) => (
            <div className={styles.container}>
              <div className={styles.raportColumn}>
                <div className={styles.raportTitle}>{raport.name}</div>
                <div>{raport.date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}</div>
              </div>
              <div className={styles.raportColumn}>
                <div className={styles.reportAuthor}>{raport.author.name}</div>
                <div onClick={dupa} className={styles.deleteRaport}>Delete Raport</div>
              </div>

              <p>{raport.description}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Raports;
