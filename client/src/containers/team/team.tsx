import React, { useEffect, useState } from "react";
import styles from "./team.module.scss";
import { useLocation, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import settingsLogo from "../../assets/settingsLogo.svg";
import trash from "../../assets/trash.svg";
import Sidebar from "./sidebar/sidebar";
import { useSelector, useDispatch } from "react-redux";
import Dnd from "./dnd/Dnd";
import InviteModal from "components/inviteModal/inviteModal";
import FormStructure from "containers/form/formStructure";
import { declineInviteFetch } from "reduxState/team/declineInvite";
import { sendInviteFetch } from "reduxState/team/sendInvite";
import { changeTeamDescriptionFetch } from "reduxState/team/changeDescription";
import { RootState } from "reduxState/store";
import { mutateToAxios } from "utils/onChangeForm";
import { teamDataFetch } from "reduxState/team/getTeamInfo";
import { deleteTeamFetch } from "reduxState/team/deleteTeam";
import { deleteUserTeamFetch } from "reduxState/team/deleteUser";
import EmptyNotification from "components/emptyNotification/emptyNotification";
import { leaveTeamFetch } from "reduxState/team/leaveTeam";

const Team = () => {
  const [modalInvite, setModalInvite] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const teamId = location.pathname.split("/")[2];

  const teamInfo = useSelector((state: any) => state.teamData.teamData);
  const inviteSendState = useSelector((state: RootState) => state.sendInvite);
  const declineInviteState = useSelector(
    (state: RootState) => state.declineInvite
  );
  const removeUser = useSelector((state: RootState) => state.deleteUserTeam);
  const leaveTeamState = useSelector((state: RootState) => state.leaveTeam);
  const handleSendRaport = () => {};
  const handleShowRaport = () => {};

  const changeDescription = useSelector(
    (state: RootState) => state.changeTeamDescription
  );

  const dispatch = useDispatch();

  const handleRejectInvite = (e: any) => {
    e.preventDefault();
    dispatch(declineInviteFetch({ id: e.target.id }, teamInfo._id));
  };

  const handleSendInvite = (e: any) => {
    e.preventDefault();
    dispatch(
      sendInviteFetch({ email: sendInviteToUser.userEmail.val }, teamInfo._id)
    );
    setSendInviteToUser(initialEmail);
  };

  useEffect(() => {
    dispatch(teamDataFetch(teamId));
  }, [
    dispatch,
    teamId,
    changeDescription.success,
    inviteSendState.success,
    declineInviteState.success,
    removeUser.success,
  ]);

  useEffect(() => {
    setDescription((prevState) => {
      return {
        ...prevState,
        description: {
          ...prevState.description,
          val: teamInfo.description,
        },
      };
    });
  }, [teamInfo.description]);

  useEffect(() => {
    if (leaveTeamState.success) {
      history.push("/home");
    }
  }, [leaveTeamState.success]);

  const initialEmail = {
    userEmail: {
      val: "",
      type: "email",
      inputType: "input",
      placeholder: "mail@mail.com",
      label: "New user email",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 26,
        passwordRule: false,
      },
      error: "It's not an email",
      touched: false,
      valid: false,
    },
    formValid: false,
  };
  const [description, setDescription] = useState({
    description: {
      val: "",
      inputType: "textarea",
      placeholder: "Description",
      label: "Description",
      validation: {
        required: true,
        minLength: 0,
        maxLength: 254,
      },
      error: "Description should be max 255 characters long",
      valid: true,
      touched: true,
    },
    formValid: true,
  });

  const handleChangeDescription = (e: any) => {
    e.preventDefault();
    dispatch(
      changeTeamDescriptionFetch(mutateToAxios(description), teamInfo._id)
    );
  };

  const [sendInviteToUser, setSendInviteToUser] = useState(initialEmail);

  const handleDeleteTeam = () => {
    dispatch(deleteTeamFetch(teamInfo._id));
    history.push("/home");
  };

  const handleRemoveUser = (id: string) => {
    dispatch(deleteUserTeamFetch(teamId, { id: id }));
  };
  const handleLeaveTeam = () => {
    dispatch(leaveTeamFetch(teamId));
  };

  return (
    <div className={styles.container}>
      <InviteModal
        show={modalInvite}
        onHide={() => setModalInvite(false)}
        user={"as"}
        title="Send Invite"
      >
        <FormStructure
          state={sendInviteToUser}
          setState={setSendInviteToUser}
          btnText="Send"
          title=""
          submitted={handleSendInvite}
          spinner={inviteSendState.loading}
        />
        <div className={styles.invitedUsers}>
          <h4>Invited users</h4>
          {teamInfo.invitations.length > 0 ? (
            <>
              {teamInfo.invitations.map((user: any) => (
                <div key={user.userId}>
                  {user.userName}
                  <img
                    id={user.userId}
                    src={trash}
                    alt="Remove invite"
                    className={styles.trashImg}
                    onClick={handleRejectInvite}
                  />
                </div>
              ))}
            </>
          ) : (
            <EmptyNotification>There is no invites</EmptyNotification>
          )}
        </div>
        <FormStructure
          state={description}
          setState={setDescription}
          btnText="EDIT"
          title="Change description"
          spinner={changeDescription.loading}
          submitted={handleChangeDescription}
        />
        <div className={styles.invitedUsers}>
          <h4>Team members</h4>
          {teamInfo.users.length > 1 ? (
            <>
              {teamInfo.users.map((user: any) => (
                <>
                  {user.id !== teamInfo.owner.id && (
                    <div key={user.id}>
                      {user.name}
                      <img
                        id={user.id}
                        src={trash}
                        alt="Remove invite"
                        className={styles.trashImg}
                        onClick={() => handleRemoveUser(user.id)}
                      />
                    </div>
                  )}
                </>
              ))}
            </>
          ) : (
            <EmptyNotification>Team has no members</EmptyNotification>
          )}
        </div>
        <div className={styles.removeWrapper}>
          <Button
            variant="danger"
            onClick={handleDeleteTeam}
            style={{ marginTop: "1em" }}
          >
            Remove team
          </Button>
        </div>
      </InviteModal>
      <div className={styles.mainPanel}>
        <div className={styles.leftSidePanel}>
          <Sidebar />
        </div>
        <div className={styles.rightSidePanel}>
          <div className={styles.headerPanel}>
            <h1 className={styles.teamName}>{teamInfo.name}</h1>
            {localStorage.getItem("id") === teamInfo.owner.id && (
              <img
                src={settingsLogo}
                alt="User settings"
                className={styles.settingsImg}
                onClick={() => setModalInvite(true)}
              />
            )}
          </div>
          <Dnd />
        </div>
      </div>

      <div className={styles.buttonsPanel}>
        <div className={styles.buttonsContainer}>
          <div className={styles.showRaportButton} onClick={handleShowRaport}>
            Show Raports
          </div>
          <div className={styles.raportButton} onClick={handleSendRaport}>
            Send Raport
          </div>
          <div className={styles.leaveButton} onClick={handleLeaveTeam}>
            Leave Team
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
