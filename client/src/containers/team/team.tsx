import React, { useEffect, useState } from "react";
import styles from "./team.module.scss";
import settingsLogo from "../../assets/settingsLogo.svg";
import Sidebar from "./sidebar/sidebar";
import { useSelector, useDispatch } from "react-redux";

const Team = () => {
  const teamInfo = useSelector((state: any) => state.teamData.teamData);

  return (
    <div className={styles.container}>
      <div className={styles.mainPanel}>
        <div className={styles.leftSidePanel}>
          <Sidebar />
        </div>
        <div className={styles.rightSidePanel}>
          <div className={styles.headerPanel}>
            <h1 className={styles.teamName}>{teamInfo.name}</h1>
            <img
              src={settingsLogo}
              alt="User settings"
              className={styles.settingsImg}
              onClick={dupa}
            />
          </div>
          <div className={styles.taskPanel}></div>
        </div>
      </div>

      <div className={styles.buttonsPanel}>
        <div className={styles.buttonsContainer}>
          <div className={styles.raportButton}>Send Raport</div>
          <div className={styles.leaveButton}>Leave Team</div>
        </div>
      </div>
    </div>
  );
};

export default Team;
