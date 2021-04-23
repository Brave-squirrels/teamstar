import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import createTeam from "../src/teams/createTeam";
import deleteInvite from "../src/teams/deleteInvite";
import deleteTeam from "../src/teams/deleteTeam";
import getTeam from "../src/teams/getTeam";
import sendInvite from "../src/teams/sendInvite";

/**
 * raport Class,
 * responsible for managing CRUD operations inside of raports
 */
export default class TeamController {
  public path = "/teams";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, auth, this.createTeam);
    this.router.get(`${this.path}/:teamId`, auth, this.getTeam);
    this.router.put(`${this.path}/:teamId`, auth, this.sendInvite);
    this.router.put(`${this.path}/:teamId`, auth, this.deleteInvite);
    this.router.delete(`${this.path}/:teamId`, auth, this.deleteTeam);
  }

  createTeam(req: Request, res: Response) {
    createTeam(req, res);
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

  deleteTeam(req: Request, res: Response) {
    deleteTeam(req, res);
  }
}
