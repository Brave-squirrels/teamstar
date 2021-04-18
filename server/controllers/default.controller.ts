import express, { Request, Response } from "express";

/**
 * Default Class,
 * responsible for managing CRUD operations inside of /comments edpoint
 */
export default class DefaultController {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.default);
  }

  default(req: Request, res: Response) {
    res.send("Welcome to the server!");
  }
}
