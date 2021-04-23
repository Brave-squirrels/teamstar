import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./sidebar.module.scss";

const Sidebar = () => {
  
  const history = useHistory();

  const user = {
    name: "asdsas",
    teams: [
      { teamId: "1231233", teamName: "team1" },
      { teamId: "123123333", teamName: "team2" },
      { teamId: "123d3333", teamName: "team3" },
    ],
  };

  const changeTeam = (e: any) => {
    history.push(`/team/${e.target.id}`);
  };

  return (
    <div className={styles.sidebar}>
      <h3>Przerwa</h3>
      <div className={styles.break}>
        <div>od 12:45:12</div>
        <div>do 20:20:30</div>
      </div>
      <ul className={styles.menu}>
        {user.teams.map((team: any) => (
          <li id={team.teamId} key={team.teamId} onClick={changeTeam}>{team.teamName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
