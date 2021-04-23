import express, { NextFunction, Request, Response } from "express";
import auth from "../middleware/auth";
import createTeam from "../src/teams/createTeam";
import deleteInvite from "../src/teams/deleteInvite";
import deleteTeam from "../src/teams/deleteTeam";
import sendInvite from "../src/teams/sendInvite";
import createCalendar from "../middleware/createCalendar";


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

    this.router.post(this.path, auth, this.createTeam, createCalendar);
    this.router.get(`${this.path}/:teamId`, auth, this.getTeam);
    this.router.put(`${this.path}/:teamId`, auth, this.sendInvite);
    this.router.put(`${this.path}/:teamId`, auth, this.deleteInvite);
    this.router.delete(`${this.path}/:teamId`, auth, this.deleteTeam);
  }

  createTeam(req: Request, res: Response, next: NextFunction) {
    createTeam(req, res, next);
  }

  getTeam(req: Request, res: Response) {
    this.getTeam(req, res);
  }

  sendInvite(req: Request, res: Response) {
    sendInvite(req, res);
  }

  deleteInvite(req: Request, res: Response) {
    deleteInvite(req, res);
  }

  deleteTeam(req: Request, res: Response) {
    deleteTeam(req, res);
  }

}
