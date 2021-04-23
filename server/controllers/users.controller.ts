import express, { Request, Response } from "express";

import auth from "../middleware/auth";
import findUser from "../middleware/findUser";
import createUser from "../src/users/createUser";
import sendEmailToUser from "../src/users/sendEmail";
import getAllUsers from "../src/users/getAllUsers";
import getUser from "../src/users/getUser";
import getUserMe from "../src/users/getUserMe";
import changePassword from "../src/users/changePassword";
import newPassword from "../src/users/newPassword";
import confirmation from "../src/users/confirmation";
import searchUser from "../src/users/searchUser";
import sendResetMail from "../src/users/changePasswordMail";
import sendChangeEmail from "../src/users/changeEmailMail";
import changeName from "../src/users/changeName";
import changeEmail from "../src/users/changeEmail";
import deleteUser from "../src/users/deleteUser";
import userActivity from "../src/users/userActivity";

/**
 * UserControll Class,
 * responsible for managing CRUD operations inside of /comments edpoint
 */
export default class UserController {
  public path = "/users";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/create`, this.createUser);
    this.router.post(`${this.path}/sendreset`, this.sendResetMail);
    this.router.post(`${this.path}/email`, this.sendEmailToUser);
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/me`, auth, this.getUserMe);
    this.router.get(`${this.path}/confirmation/:token`, this.confirmation);
    this.router.get(`${this.path}/search/:email?`, this.searchUser);
    this.router.put(`${this.path}/password`, auth, this.newPassword);
    this.router.put(`${this.path}/changepassword`, auth, this.changePassword);
    this.router.put(`${this.path}/changeEmail`, auth, this.sendChangeEmail);
    this.router.put(`${this.path}/changeName`, auth, this.changeName);
    this.router.put(`${this.path}/active`, auth, this.userActivity);
    this.router.get(`${this.path}/email/:token/:newEmail`, this.changeEmail);
    this.router.delete(`${this.path}/`, auth, this.deleteUser);
  }

  createUser(req: Request, res: Response) {
    createUser(req, res);
  }

  sendResetMail(req: Request, res: Response) {
    sendResetMail(req, res);
  }

  sendEmailToUser(req: Request, res: Response) {
    sendEmailToUser(req, res);
  }

  getAllUsers(req: Request, res: Response) {
    getAllUsers(req, res);
  }

  getUser(req: Request, res: Response) {
    getUser(req, res);
  }

  getUserMe(req: Request, res: Response) {
    getUserMe(req, res);
  }

  confirmation(req: Request, res: Response) {
    confirmation(req, res);
  }

  searchUser(req: Request, res: Response) {
    searchUser(req, res);
  }

  newPassword(req: Request, res: Response) {
    newPassword(req, res);
  }

  changePassword(req: Request, res: Response) {
    changePassword(req, res);
  }

  sendChangeEmail(req: Request, res: Response) {
    sendChangeEmail(req, res);
  }

  changeName(req: Request, res: Response) {
    changeName(req, res);
  }

  userActivity(req: Request, res: Response) {
    userActivity(req, res);
  }

  changeEmail(req: Request, res: Response) {
    changeEmail(req, res);
  }

  deleteUser(req: Request, res: Response) {
    deleteUser(req, res);
  }
}
