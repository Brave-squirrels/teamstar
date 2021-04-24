import express, { Request, Response } from "express";
import { register } from "ts-node";
import auth from "../middleware/auth";
import createRaport from "../src/raport/createRaport";
import deleteRaport from "../src/raport/deleteRaport";
import getRaports from "../src/raport/getRaports";

/**
 * raport Class,
 * responsible for managing CRUD operations inside of raports
 */
export default class RaportController {
  public path = "/teams/:teamId/raports";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, auth, this.getRaport);
    this.router.post(this.path, auth, this.createRaport);
    this.router.delete(`${this.path}/:raportId`, auth, this.deleteRaport);
  }

  getRaport(req: Request, res: Response) {
    getRaports(req, res);
  }

  createRaport(req: Request, res: Response) {
    createRaport(req, res);
  }

  deleteRaport(req: Request, res: Response) {
    deleteRaport(req, res);
  }
}
