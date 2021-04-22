import express, { Request, Response } from "express";

import auth from "../middleware/auth";
import password from "../middleware/password";
import createUser from "../src/users/createUser";
import sendEmailToUser from "../src/users/sendEmail";
import getAllUsers from "../src/users/getAllUsers";
import getUserMe from "../src/users/getUserMe";
import changePassword from "../src/users/changePassword";
import newPassword from "../src/users/newPassword";
import confirmation from "../src/users/confirmation";
import searchUser from "../src/users/searchUser";
import sendResetMail from "../src/users/changePasswordMail";
import changeName from '../src/users/changeName';

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
    this.router.post(`${this.path}/create`, password, this.createUser);
    this.router.post(`${this.path}/sendreset`, this.sendResetMail);
    this.router.post(`${this.path}/email`, this.sendEmailToUser);
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/me`, auth, this.getUserMe);
    this.router.get(`${this.path}/confirmation/:token`, this.confirmation);
    this.router.get(`${this.path}/search/:email?`, this.searchUser);
    this.router.put(`${this.path}/password`, auth, password, this.newPassword);
    this.router.put(
      `${this.path}/changepassword`,
      auth,
      password,
      this.changePassword
    );
    this.router.put(`${this.path}/changeName`, auth, this.changeName);
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

  changeName(req: Request, res: Response) {
    changeName(req, res);
  }
}
