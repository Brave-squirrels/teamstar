import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./sidebar.module.scss";
import { teamDataFetch } from "reduxState/team/getTeamInfo";

const Sidebar = () => {
  const location = useLocation();
  const teamMembers = useSelector((state: any) => state.teamData.teamData.users);
  const teamId = location.pathname.split("/")[2];

  const dispatch = useDispatch();

  const [reveal, setReveal] = useState(true);
  const [sideClasses, setSideClasses] = useState([styles.sidebar]);

  useEffect(() => {
    reveal
      ? setSideClasses([styles.sidebar])
      : setSideClasses([styles.sidebar, styles.closed]);
  }, [reveal]);


  useEffect(() => {
    dispatch(teamDataFetch(teamId));
  }, [dispatch, teamId]);

  const toggle = () => setReveal(!reveal);
  const dupa = () => console.log(teamMembers)
  return (
    <div className={sideClasses.join(" ")}>
      <div className={styles.menuContainer}>
        <h3>Timebreak</h3>
        <div className={styles.break}>
          <div>at 12:45:12</div>
        </div>
        <ul className={styles.menu}>
          <li onClick = {dupa}>Users</li>
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
