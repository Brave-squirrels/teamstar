import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./sidebar.module.scss";
import { teamDataFetch } from "reduxState/team/getTeamInfo";

const Sidebar = () => {
  const location = useLocation();
  const userTeams = useSelector((state: any) => state.loginUser.userData.teams);
  const teamId = location.pathname.split("/")[2];

  const dispatch = useDispatch();
  const history = useHistory();

  const [reveal, setReveal] = useState(true);
  const [sideClasses, setSideClasses] = useState([styles.sidebar]);

  useEffect(() => {
    reveal
      ? setSideClasses([styles.sidebar])
      : setSideClasses([styles.sidebar, styles.closed]);
  }, [reveal]);

  const changeTeam = (e: any) => {
    history.push(`/team/${e.target.id}`)
  };

  useEffect(() => {
    dispatch(teamDataFetch(teamId));
  }, [dispatch, teamId]);

  const toggle = () => setReveal(!reveal);

  return (
    <div className={sideClasses.join(" ")}>
      <div className={styles.menuContainer}>
        <h3>Timebreak</h3>
        <div className={styles.break}>
          <div>at 12:45:12</div>
        </div>
        <ul className={styles.menu}>
          <li>Teams</li>
          {userTeams.map((team: any) => (
            <li id={team.teamId} key={team.teamId} onClick={changeTeam}>
              {team.teamName}
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
