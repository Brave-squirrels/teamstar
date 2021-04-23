import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { RootState } from "reduxState/store";

import MyVerticallyCenteredModal from "containers/user/settings/MyVerticallyCenteredModal";
import FormStructure from "containers/form/formStructure";

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
        required: true,
        minLength: 1,
        maxLength: 255,
      },
      error: "Description should be between 1 and 255 characters long",
      touched: false,
      valid: false,
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
            <div className={styles.card}>
              <div className={styles.cardTitle}>Team name</div>
              <div className={styles.cardBody}>Description</div>
              <div className={styles.cardFooter}>
                <Button>GO TO</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.innerWrapper}>
          <div className={styles.title}>MY INVITES</div>
          <div className={styles.cardsCon}>
            <div className={styles.card}>
              <div className={styles.cardInvitesTitle}>Team name</div>
              <div className={styles.cardInvitesBody}>
                <Button variant="success">ACCEPT</Button>
                <Button variant="danger">REJECT</Button>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardInvitesTitle}>Team name</div>
              <div className={styles.cardInvitesBody}>
                <Button variant="success">ACCEPT</Button>
                <Button variant="danger">REJECT</Button>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardInvitesTitle}>Team name</div>
              <div className={styles.cardInvitesBody}>
                <Button variant="success">ACCEPT</Button>
                <Button variant="danger">REJECT</Button>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardInvitesTitle}>Team name</div>
              <div className={styles.cardInvitesBody}>
                <Button variant="success">ACCEPT</Button>
                <Button variant="danger">REJECT</Button>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardInvitesTitle}>Team name</div>
              <div className={styles.cardInvitesBody}>
                <Button variant="success">ACCEPT</Button>
                <Button variant="danger">REJECT</Button>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardInvitesTitle}>Team name</div>
              <div className={styles.cardInvitesBody}>
                <Button variant="success">ACCEPT</Button>
                <Button variant="danger">REJECT</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
