import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./sidebar.module.scss";
import { teamDataFetch } from "reduxState/team/getTeamInfo";
import { RootState } from "reduxState/store";

const Sidebar = () => {
  const location = useLocation();
  const teamInfo = useSelector((state: any) => state.teamData.teamData);
  const teamMembers = useSelector((state: any) => teamInfo.users);
  const teamId = location.pathname.split("/")[2];

  const dispatch = useDispatch();

  const [reveal, setReveal] = useState(true);
  const [sideClasses, setSideClasses] = useState([styles.sidebar]);

  const loginState = useSelector((state: RootState) => state.loginUser);
  const [currentBreak, setCurrentBreak] = useState("");

  const checkBreak = () => {
    if (loginState.userData!.breakTime) {
      const hourEnd = parseInt(
        loginState.userData!.breakTime["b1"].end[0] +
          loginState.userData!.breakTime["b1"].end[1]
      );
      const minuteEnd = parseInt(
        loginState.userData!.breakTime["b1"].end[3] +
          loginState.userData!.breakTime["b1"].end[4]
      );

      const end = hourEnd * 60 + minuteEnd;
      const now = new Date();
      const time = now.getHours() * 60 + now.getMinutes();
      if (time > end) {
        setCurrentBreak(loginState.userData!.breakTime["b2"].start);
        console.log("xD");
      } else {
        setCurrentBreak(loginState.userData!.breakTime["b1"].start);
      }
    }
  };

  useEffect(() => {
    reveal
      ? setSideClasses([styles.sidebar])
      : setSideClasses([styles.sidebar, styles.closed]);
  }, [reveal]);

  useEffect(() => {
    dispatch(teamDataFetch(teamId));
  }, [dispatch, teamId]);
  useEffect(() => {
    checkBreak();
  }, [loginState.userData]);

  const toggle = () => setReveal(!reveal);
  const dupa = () => console.log(teamMembers);
  return (
    <div className={sideClasses.join(" ")}>
      <div className={styles.menuContainer}>
        <h3>Timebreak</h3>
        <div className={styles.break}>
          <div>at {currentBreak}</div>
        </div>
        <h3 className={styles.descriptionTitle}>Description</h3>
        <div className={styles.description}>
          <div>{teamInfo.description}</div>
        </div>
        <ul className={styles.menu}>
          <li onClick={dupa}>Users</li>
          {teamMembers.map((member: any) => (
            <li id={member.id} key={member.id}>
              {member.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.toggleContainer}>
        <span className={styles.toggle} onClick={toggle}>
          ↩
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
