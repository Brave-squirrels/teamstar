import express, { NextFunction, Request, Response } from "express";
import auth from "../middleware/auth";
import acceptInvitation from "../src/teams/acceptInvitation";
import createTeam from "../src/teams/createTeam";
import deleteInvite from "../src/teams/deleteInvite";
import deleteTeam from "../src/teams/deleteTeam";
import getTeam from "../src/teams/getTeam";
import leaveTeam from "../src/teams/leaveTeam";
import sendInvite from "../src/teams/sendInvite";
import createCalendar from "../middleware/createCalendar";
import changeDescription from '../src/teams/changeTeamDescription';
import deleteUser from '../src/teams/deleteUserFromTeam';
import createChat from "../middleware/createChat";

/**
 * team Class,
 * responsible for managing CRUD operations inside of teams
 */
export default class TeamController {
  public path = "/teams";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {

    this.router.post(this.path, auth, createCalendar, this.createTeam, createChat);
    this.router.get(`${this.path}/:teamId`, auth, this.getTeam);
    this.router.put(`${this.path}/:teamId/sendInvite`, auth, this.sendInvite);
    this.router.put(
      `${this.path}/:teamId/deleteInvite`,
      auth,
      this.deleteInvite
    );
    this.router.put(
      `${this.path}/:teamId/acceptInvite`,
      auth,
      this.acceptInvite
    );
    this.router.put(`${this.path}/:teamId/leaveTeam`, auth, this.leaveTeam);
    this.router.delete(`${this.path}/:teamId`, auth, this.deleteTeam);
    this.router.put(`${this.path}/:teamId/changeDescription`, auth, this.changeDescription);
    this.router.put(`${this.path}/:teamId/deleteUser`, auth, this.deleteUser)
  }

  createTeam(req: Request, res: Response, next: NextFunction) {
    createTeam(req, res, next);
  }

  getTeam(req: Request, res: Response) {
    getTeam(req, res);
  }

  sendInvite(req: Request, res: Response) {
    sendInvite(req, res);
  }

  deleteInvite(req: Request, res: Response) {
    deleteInvite(req, res);
  }

  acceptInvite(req: Request, res: Response) {
    acceptInvitation(req, res);
  }

  leaveTeam(req: Request, res: Response) {
    leaveTeam(req, res);
  }

  deleteTeam(req: Request, res: Response) {
    deleteTeam(req, res);
  }
  changeDescription(req: Request, res: Response) {
    changeDescription(req, res);
  }
  deleteUser(req: Request, res: Response) {
    deleteUser(req, res);
  }
}
