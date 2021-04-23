import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import addEvent from "../src/calendar/addEvent";


/**
 * team Class,
 * responsible for managing CRUD operations inside of teams
 */
export default class CalendarController {
  public path = "/calendar";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.put(`${this.path}/:teamId`, auth, this.addEvent);
    
  }

  addEvent(req: Request, res: Response) {
    addEvent(req, res);
  }

  
}
