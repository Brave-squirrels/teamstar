import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import badRequest from "../src/errors/badRequest";

export default class ErrosController {
  public path = "/errors";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}/notFound`, this.notFound);
    this.router.get(`${this.path}/badRequest`, this.badRequest);
    this.router.get(`${this.path}/unauthorized`, this.unauthorized);
    this.router.get(`${this.path}/serverError`, this.serverError);
  }

  notFound(req: Request, res: Response) {
    return res.status(StatusCodes.NOT_FOUND).send();
  }

  badRequest(req: Request, res: Response){
    badRequest(req,res);
  }

  serverError(req: Request, res: Response){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }   
    
   unauthorized(req: Request, res: Response){
    return res.status(StatusCodes.UNAUTHORIZED).send();
  }
}
