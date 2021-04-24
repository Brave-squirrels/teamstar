import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const team = await teamModel.findById(req.params.id);
  if (!team) return res.status(StatusCodes.BAD_REQUEST).send("Team not found!");

  let exists = false;
  team.users.forEach((user) => {
    if (user.id === req.userInfo._id) exists = true;
  });
  if (!exists)
    return res.status(StatusCodes.BAD_REQUEST).send("Its not your team!");

  return res.status(StatusCodes.OK).send(team);
};
