import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { RootState } from "reduxState/store";

import MyVerticallyCenteredModal from "containers/user/settings/MyVerticallyCenteredModal";
import FormStructure from "containers/form/formStructure";
import { Team, TeamInvitation } from "utils/types";

import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const userData = useSelector((state: RootState) => state.loginUser.userData);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState({ date: new Date() });

  setInterval(() => {
    setDate({ date: new Date() });
  }, 1000);

  const [form, setForm] = useState({
    name: {
      val: "",
      type: "text",
      inputType: "input",
      placeholder: "Team name",
      label: "Team name",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 24,
      },
      error: "Team name should be between 3 and 24 characters long",
      touched: false,
      valid: false,
    },
    description: {
      val: "",
      inputType: "textarea",
      placeholder: "Description",
      label: "Description",
      validation: {
        required: false,
        minLength: 0,
        maxLength: 255,
      },
      error: "Description should can't be longer than 255 characters",
      touched: true,
      valid: true,
    },
    formValid: false,
  });

  const handleCreateTeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Display invites and teams
  return (
    <>
      <MyVerticallyCenteredModal
        show={show}
        onHide={() => setShow(false)}
        title={"Create new team"}
      >
        <FormStructure
          state={form}
          setState={setForm}
          title={""}
          btnText="CREATE"
          submitted={handleCreateTeam}
        />
      </MyVerticallyCenteredModal>
      <div className={styles.topWrapper}>
        {date.date.toLocaleString()}
        <Button onClick={() => setShow(true)}>New team</Button>
      </div>
      <div className={styles.container}>
        <div className={styles.innerWrapper}>
          <div className={styles.title}>MY TEAMS</div>
          <div className={styles.cardsCon}>
            {userData?.teams.map((team: Team) => (
              <div className={styles.card}>
                <div className={styles.cardTitle}>{team.teamName}</div>
                <div className={styles.cardBody}></div>
                <div className={styles.cardFooter}>
                  <Link to={`/team/${team.teamId}`}>
                    <Button>GO TO</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.innerWrapper}>
          <div className={styles.title}>MY INVITES</div>
          <div className={styles.cardsCon}>
            {userData?.teamInvitation.map((invite: TeamInvitation) => (
              <div className={styles.card}>
                <div className={styles.cardInvitesTitle}>{invite.teamName}</div>
                <div className={styles.cardInvitesBody}>
                  <Button variant="success">ACCEPT</Button>
                  <Button variant="danger">REJECT</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
