import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./sidebar.module.scss";

const Sidebar = () => {
  const user = {
    name: "asdsas",
    teams: [
      { teamId: "1231233", teamName: "team1" },
      { teamId: "123123333", teamName: "team2" },
      { teamId: "123d3333", teamName: "team3" },
    ],
  };

  const history = useHistory();

  const [reveal, setReveal] = useState(true);
  const [sideClasses, setSideClasses] = useState([styles.sidebar]);

  useEffect(() => {
    reveal
      ? setSideClasses([styles.sidebar])
      : setSideClasses([styles.sidebar, styles.closed]);
  }, [reveal]);  

  const changeTeam = (e: any) => {
    history.push(`/team/${e.target.id}`);
  };

  const toggle = () => setReveal(!reveal);

  return (
    <div className={sideClasses.join(" ")}>
      <div className={styles.menuContainer}>
        <h3>Timebreak</h3>
        <div className={styles.break}>
          <div>from 12:45:12</div>
          <div>to 20:20:30</div>
        </div>
        <ul className={styles.menu}>
          {user.teams.map((team: any) => (
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
