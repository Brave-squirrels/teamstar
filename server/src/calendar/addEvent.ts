import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import calendarModel from "../../models/calendar.model";
import userModel from "../../models/user.model";
import validateEvent from "./validateEvent";

export default async (req: Request, res: Response) => {

    const calendar = await calendarModel.findOne({"team.id": req.params.teamId});
    if(!calendar) { return res.status(StatusCodes.BAD_REQUEST).send("Calendar not found")};

    const user = await userModel.findById(req.userInfo._id);
    if(!user) { return res.status(StatusCodes.BAD_REQUEST).send("User not found")};

    const eventData = {
        ...req.body
    };

    const { error } = validateEvent(eventData);
    if (error) { return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message); }


    let events = calendar.events;

    events.push(eventData);

    calendar.set({
        events: events
    });

    await calendar.save();

    res.status(StatusCodes.OK).send('New event succesfully added!');

}