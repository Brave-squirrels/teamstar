import React from "react";
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

  return <div className={styles.sidebar}>
      <h3>Przerwa</h3>
      <div>od 12:45:12</div>
      <div>do 20:20:30</div>
      <ul className={styles.menu}>
      {user.teams.map(((team : any) => <li key={team.teamId}>{team.teamName}</li>))}
      </ul>
      
  </div>;
};

export default Sidebar