import React, { useEffect, useState } from "react";
import styles from "./team.module.scss";
import { useLocation, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import settingsLogo from "../../assets/settingsLogo.svg";
import trash from "../../assets/trash.svg";
import Sidebar from "./sidebar/sidebar";
import Raports from "./raports/raports";
import { useSelector, useDispatch } from "react-redux";
import Dnd from "./dnd/Dnd";
import InviteModal from "components/inviteModal/inviteModal";
import RaportsModal from "components/raportsModal/raportsModal";
import FormStructure from "containers/form/formStructure";
import { declineInviteFetch } from "reduxState/team/declineInvite";
import { sendInviteFetch } from "reduxState/team/sendInvite";
import { changeTeamDescriptionFetch } from "reduxState/team/changeDescription";
import { RootState } from "reduxState/store";
import { mutateToAxios } from "utils/onChangeForm";
import { teamDataFetch } from "reduxState/team/getTeamInfo";
import { deleteTeamFetch } from "reduxState/team/deleteTeam";
import { deleteUserTeamFetch } from "reduxState/team/deleteUser";
import { leaveTeamFetch } from "reduxState/team/leaveTeam";
import { createRaportFetch } from "reduxState/raport/createRaport";
import { getRaportsFetch } from "reduxState/raport/getRaports";

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
  const createRaportState = useSelector(
    (state: RootState) => state.createRaport
  );
  const deleteRaportState = useSelector(
    (state: RootState) => state.deleteRaport
  );

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
    setShowAllRaport(false);
    dispatch(getRaportsFetch(teamId));
  }, [createRaportState, deleteRaportState]);

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
    // eslint-disable-next-line
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

  const [showAllRaport, setShowAllRaport] = useState(false);

  const [showRaport, setShowRaport] = useState(false);
  const [raportForm, setRaportForm] = useState({
    name: {
      val: "",
      inputType: "input",
      type: "text",
      placeholder: "Title",
      label: "Title",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 24,
      },
      error: "Title should be between 3 and 24 characters long",
      valid: false,
      touched: false,
    },
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
      valid: false,
      touched: false,
    },
    formValid: false,
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
  const handleCreateRaport = (e: any) => {
    e.preventDefault();
    setShowRaport(false);
    dispatch(createRaportFetch(mutateToAxios(raportForm), teamId));
  };

  return (
    <div className={styles.container}>
      <RaportsModal
        show={showAllRaport}
        onHide={() => setShowAllRaport(false)}
        user={"as"}
        title="Raport"
        className={styles.raportsModal}
      >
        <Raports />
      </RaportsModal>
      <InviteModal
        show={showRaport}
        onHide={() => setShowRaport(false)}
        user={"as"}
        title="Create raport"
      >
        <FormStructure
          state={raportForm}
          setState={setRaportForm}
          btnText="Create"
          title=""
          submitted={handleCreateRaport}
        />
      </InviteModal>
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
            <div className={styles.notFound}>
              {" "}
              <div>There is no invites</div>{" "}
            </div>
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
            <div className={styles.notFound}>
              {" "}
              <div> Team has no members</div>
            </div>
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
          <div
            className={styles.showRaportButton}
            onClick={() => setShowAllRaport(true)}
          >
            Show Raports
          </div>
          <div
            className={styles.raportButton}
            onClick={() => setShowRaport(true)}
          >
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
