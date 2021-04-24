import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const team = await teamModel.findById(req.params.teamId);
  if (!team) return res.status(StatusCodes.BAD_REQUEST).send("Team not found!");

  if (req.userInfo._id !== team.owner.id)
    return res.status(StatusCodes.BAD_REQUEST).send("You cant do that!");

  team.description = req.body.description;

  await team.save();

  return res.status(StatusCodes.OK).send(team);
};
