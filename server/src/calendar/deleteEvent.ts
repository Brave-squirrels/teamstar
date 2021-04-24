import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import calendarModel from "../../models/calendar.model";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

export default async (req: Request, res: Response) => {

    const calendar = await calendarModel.findById(req.params.calendarId);
    if(!calendar) { return res.status(StatusCodes.BAD_REQUEST).send("Calendar not found")};

    const team = await teamModel.findOne({calendarId: req.params.calendarId});

    const users = await userModel.find({"teams": {"$elemMatch": {"teamId": team._id}}}).select("-password");

    const isFromTeam = users.filter(user => user._id==req.userInfo._id)

    if(isFromTeam.length === 0 ) { return res.status(StatusCodes.UNAUTHORIZED).send("You are not allowed to do that!")};

    const eventId = req.params.eventId;

    let eventsUpdated = calendar.events.filter(event => event._id!=eventId);

    calendar.set({
        events: eventsUpdated
    })    

    await calendar.save();

    res.status(StatusCodes.OK).send('Event deleted!');

}