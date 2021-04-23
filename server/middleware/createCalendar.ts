import { Request, Response } from "express";
import calendarModel from '../models/calendar.model';

const createCalendar = async (req: Request, res: Response) => {
    const team = res.locals.team;

    const newCalendar = new calendarModel({
        team: {
            id: team._id,
            name: team.name
        },
        events: []
    })

    await newCalendar.save();
}

export default createCalendar;