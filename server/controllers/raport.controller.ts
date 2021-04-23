import express, { Request, Response } from "express";
import createRaport from "../src/raport/createRaport";
import deleteRaport from "../src/raport/deleteRaport";

/**
 * raport Class,
 * responsible for managing CRUD operations inside of raports
 */
export default class RaportController {
  public path = "/team/:teamId";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.createRaport);
    this.router.delete(this.path, this.deleteRaport);
  }

  createRaport(req: Request, res: Response) {
    createRaport(req, res);
  }

  deleteRaport(req: Request, res: Response) {
    deleteRaport(req, res);
  }
}
