import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import getCalendar from '../src/calendar/getCalendar';
import addEvent from "../src/calendar/addEvent";
import deleteEvent from "../src/calendar/deleteEvent";
import updateEvent from "../src/calendar/updateEvent";


/**
 * calendar Class,
 * responsible for managing CRUD operations inside of calendar
 */
export default class CalendarController {
  public path = "/calendar";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}/:calendarId`, auth, this.getCalendar);
    this.router.put(`${this.path}/:calendarId`, auth, this.addEvent);
    this.router.put(`${this.path}/:calendarId/event/:eventId/update`, auth, this.updateEvent);
    this.router.put(`${this.path}/:calendarId/event/:eventId/delete`, auth, this.deleteEvent);
  }

  getCalendar(req: Request, res: Response) {
    getCalendar(req, res);
  }

  addEvent(req: Request, res: Response) {
    addEvent(req, res);
  }

  updateEvent(req: Request, res: Response) {
    updateEvent(req, res);
  }

  deleteEvent(req: Request, res: Response) {
    deleteEvent(req, res);
  }

  
}
