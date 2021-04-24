import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";

import thunk from "redux-thunk";

import loginUser from "reduxState/user/loginUser";
import createUser from 'reduxState/user/registerUser';
import sendReset from 'reduxState/user/sendResetPassword';
import sendAgain from 'reduxState/user/sendAgain';
import resetPassword from 'reduxState/user/resetPassword';
import changeName from 'reduxState/user/changeName';
import changePassword from 'reduxState/user/changePassword';
import changeEmail from 'reduxState/user/changeEmail';
import deleteUser from 'reduxState/user/deleteUser';

import createTeam from 'reduxState/team/createTeam';
import declineInvite from 'reduxState/team/declineInvite';
import acceptInvite from 'reduxState/team/acceptInvite';
import teamData from 'reduxState/team/getTeamInfo';
import sendInvite from 'reduxState/team/sendInvite';
import leaveTeam from 'reduxState/team/leaveTeam';
import deleteTeam from 'reduxState/team/deleteTeam';
import changeTeamDescription from 'reduxState/team/changeDescription';

import createTask from 'reduxState/tasks/createTask';
import editTask from 'reduxState/tasks/editTask';
import getTasks from 'reduxState/tasks/getTasks';

export const store = configureStore({
  reducer: {
    loginUser,
    createUser,
    sendReset,
    sendAgain,
    resetPassword,
    changeName,
    changePassword,
    changeEmail,
    deleteUser,
    createTeam,
    declineInvite,
    acceptInvite,
    teamData,
    sendInvite,
    leaveTeam,
    deleteTeam,
    changeTeamDescription,
    createTask,
    editTask,
    getTasks,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    thunk,
  ],
  devTools: process.env.REACT_APP_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
