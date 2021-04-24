import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import calendarModel from "../../models/calendar.model";
import userModel from "../../models/user.model";
import teamModel from "../../models/team.model";
import validateEvent from "./validateEvent";

export default async (req: Request, res: Response) => {

    const calendar = await calendarModel.findById(req.params.calendarId);
    if(!calendar) { return res.status(StatusCodes.BAD_REQUEST).send("Calendar not found")};

    const user = await userModel.findById(req.userInfo._id);
    if(!user) { return res.status(StatusCodes.BAD_REQUEST).send("User not found")};

    const team = await teamModel.findOne({calendarId: req.params.calendarId});

    const users = await userModel.find({"teams": {"$elemMatch": {"teamId": team._id}}}).select("-password");

    const isFromTeam = users.filter(user => user._id==req.userInfo._id)

    if(isFromTeam.length === 0 ) { return res.status(StatusCodes.UNAUTHORIZED).send("You are not allowed to do that!")};


    const author = {
        id: user._id,
        name: user.name
    }

    const eventData = {
        author,
        ...req.body
    }

    const { error } = validateEvent(eventData);
        if (error) { return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message); 
    }

    let events = calendar.events;

    events.push(eventData);

    calendar.set({
        events: events
    });

    await calendar.save();

    res.status(StatusCodes.OK).send('New event succesfully added!');

}