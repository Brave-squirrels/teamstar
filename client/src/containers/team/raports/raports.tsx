import styles from "./raports.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import React from "react";
import { RootState } from "reduxState/store";

import { deleteRaportFetch } from "reduxState/raport/deleteRaport";
import EmptyNotification from "components/emptyNotification/emptyNotification";

const Raports = (props: any) => {
  const dispatch = useDispatch();
  const raports = useSelector(
    (state: RootState) => state.getRaports.raportData
  );
  const location = useLocation();
  const teamId = location.pathname.split("/")[2];
  const teamData = useSelector((state: RootState) => state.teamData.teamData);
  const handleRemoveRaport = (id: string) => {
    dispatch(deleteRaportFetch(teamId, id));
  };
  return (
    <div className={styles.wrapper}>
      {raports.length > 0 ? (
        <>
          {raports.map((raport: any) => (
            <div className={styles.container}>
              <div className={styles.raportColumn}>
                <div className={styles.raportTitle}>{raport.name}</div>
                <div>{raport.date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}</div>
              </div>
              <div className={styles.raportColumn}>
                <div className={styles.reportAuthor}>{raport.author.name}</div>
                {localStorage.getItem("id") === teamData?.owner!.id && (
                  <div
                    onClick={() => handleRemoveRaport(raport._id)}
                    className={styles.deleteRaport}
                  >
                    Delete Raport
                  </div>
                )}
              </div>

              <p>{raport.description}</p>
            </div>
          ))}
        </>
      ) : (
        <EmptyNotification>There is no raports in this team</EmptyNotification>
      )}
    </div>
  );
};

export default Raports;
