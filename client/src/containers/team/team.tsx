import React from "react";
import styles from "./team.module.scss";
import settingsLogo from "../../assets/settingsLogo.svg";
import Sidebar from "./sidebar/sidebar";
const team = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainPanel}>
        <div className={styles.leftSidePanel}>
          <Sidebar />
        </div>
        <div className={styles.rightSidePanel}>
          <div className={styles.headerPanel}>
            <h1 className={styles.teamName}>Team Name</h1>
            <img
              src={settingsLogo}
              alt="User settings"
              className={styles.settingsImg}
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

export default team;
