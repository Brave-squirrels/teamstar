import { NextFunction, Request, Response } from "express";
import calendarModel from '../models/calendar.model';

const createCalendar = async (req: Request, res: Response, next: NextFunction) => {

    const newCalendar = new calendarModel({
        events: []
    })

    await newCalendar.save();

    res.locals.calendar = newCalendar;
    next();
}

export default createCalendar;