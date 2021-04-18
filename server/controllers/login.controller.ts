import express, { Request, Response } from "express";
import login from "../src/login/login";

/**
 * Login Class,
 * responsible for managing CRUD operations inside of /comments edpoint
 */
export default class LoginController {
  public path = "/login";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.login);
  }

  login(req: Request, res: Response) {
    login(req, res);
  }
}
