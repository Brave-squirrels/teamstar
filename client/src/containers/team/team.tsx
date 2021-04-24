import React, { useEffect, useState } from "react";
import styles from "./team.module.scss";
import settingsLogo from "../../assets/settingsLogo.svg";
import trash from "../../assets/trash.svg";
import Sidebar from "./sidebar/sidebar";
import { useSelector, useDispatch } from "react-redux";
import InviteModal from "components/inviteModal/inviteModal"
import FormStructure from "containers/form/formStructure";

const Team = () => {
  const [modalInvite, setModalInvite] = useState(false)

  const teamInfo = useSelector((state: any) => state.teamData.teamData);

  const changePassword = useSelector(
    (state: any) => state.changePassword
  );

  const dupa = () => {
    console.log(teamInfo.invitations)
  }

  const [changePasswordForm, setChangePasswordForm] = useState({
    oldPassword: {
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
      error:
        "It's not an email",
      touched: false,
      valid: false,
    },    
    formValid: false,
  });
  
  
  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <InviteModal
        show={modalInvite}
        onHide={() => setModalInvite(false)}
        user={'as'}
        title="Send Invite"
      >
        <FormStructure
          state={changePasswordForm}
          setState={setChangePasswordForm}
          btnText="Send"
          title=""
          submitted={handleChangePassword}
          spinner={changePassword.loading}
          checkPass={true}
        />
        <div className={styles.invitedUsers}>
        <h4>Invited users</h4>
        {teamInfo.invitations.map((user: any) => <div key = {user._id}>
          {user.userName}
          <img
              src={trash}
              alt="Remove invite"
              className={styles.trashImg}
              onClick={() => setModalInvite(true)}
            />
          </div>)}
        </div>
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
          <div className={styles.taskPanel}></div>
        </div>
      </div>

      <div className={styles.buttonsPanel}>
        <div className={styles.buttonsContainer}>
          <div onClick = {dupa} className={styles.raportButton}>Send Raport</div>
          <div className={styles.leaveButton}>Leave Team</div>
        </div>
      </div>
    </div>
  );
};

export default Team;
