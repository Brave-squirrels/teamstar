import React, { useEffect, useState } from "react";
import styles from "./team.module.scss";
import { useLocation } from "react-router-dom";
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

const Team = () => {
  const [modalInvite, setModalInvite] = useState(false);

  const location = useLocation();
  const teamId = location.pathname.split("/")[2];

  const teamInfo = useSelector((state: any) => state.teamData.teamData);
  const inviteSendState = useSelector((state: RootState) => state.sendInvite);
  const declineInviteState = useSelector(
    (state: RootState) => state.declineInvite
  );

  const handleSendRaport = () => {};

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
    teamInfo.description,
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
        </div>
        <FormStructure
          state={description}
          setState={setDescription}
          btnText="EDIT"
          title="Change description"
          spinner={changeDescription.loading}
          submitted={handleChangeDescription}
        />
      </InviteModal>
      <div className={styles.mainPanel}>
        <div className={styles.leftSidePanel}>
          <Sidebar />
        </div>
        <div className={styles.rightSidePanel}>
          <div className={styles.headerPanel}>
            <h1 className={styles.teamName}>{teamInfo.name}</h1>
            <img
              src={settingsLogo}
              alt="User settings"
              className={styles.settingsImg}
              onClick={() => setModalInvite(true)}
            />
          </div>
          <Dnd />
        </div>
      </div>

      <div className={styles.buttonsPanel}>
        <div className={styles.buttonsContainer}>
          <div className={styles.raportButton} onClick={handleSendRaport}>
            Send Raport
          </div>
          <div className={styles.leaveButton}>Leave Team</div>
        </div>
      </div>
    </div>
  );
};

export default Team;
