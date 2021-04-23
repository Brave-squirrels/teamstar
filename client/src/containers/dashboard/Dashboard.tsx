import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { RootState } from "reduxState/store";

import MyVerticallyCenteredModal from "containers/user/settings/MyVerticallyCenteredModal";
import FormStructure from "containers/form/formStructure";
import EmptyNotification from "components/emptyNotification/emptyNotification";

import { Team, TeamInvitation } from "utils/types";

import styles from "./dashboard.module.scss";

import { mutateToAxios } from "utils/onChangeForm";
import { authUser } from "reduxState/user/loginUser";

const Dashboard = () => {
  const userData = useSelector((state: RootState) => state.loginUser.userData);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState({ date: new Date() });
  const [currentButton, setCurrentButton] = useState("");

  const dispatch = useDispatch();

  setInterval(() => {
    setDate({ date: new Date() });
  }, 1000);

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

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
    const data = mutateToAxios(form);
  };

  const handleAcceptInvite = (id: string) => {
    setCurrentButton(id);
  };
  const handleRejectInvite = (id: string) => {
    setCurrentButton(id);
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
            {userData!.teams.length > 0 ? (
              <>
                {userData?.teams.map((team: Team) => (
                  <div className={styles.card} key={team.teamId}>
                    <div className={styles.cardTitle}>{team.teamName}</div>
                    <div className={styles.cardBody}></div>
                    <div className={styles.cardFooter}>
                      <Link to={`/team/${team.teamId}`}>
                        <Button>GO TO</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <EmptyNotification>
                You don't belong to any teams
              </EmptyNotification>
            )}
          </div>
        </div>
        <div className={styles.innerWrapper}>
          <div className={styles.title}>MY INVITES</div>
          <div className={styles.cardsCon}>
            {userData!.teamInvitation.length > 0 ? (
              <>
                {userData?.teamInvitation.map((invite: TeamInvitation) => (
                  <div className={styles.card} key={invite.teamId}>
                    <div className={styles.cardInvitesTitle}>
                      {invite.teamName}
                    </div>
                    <div className={styles.cardInvitesBody}>
                      <Button
                        variant="success"
                        onClick={() => handleAcceptInvite(invite.teamId)}
                      >
                        ACCEPT
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleRejectInvite(invite.teamId)}
                      >
                        REJECT
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <EmptyNotification>You don't have any invites</EmptyNotification>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
