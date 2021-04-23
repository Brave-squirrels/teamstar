import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import raportModel from "../../models/raport.model";
import teamModel from "../../models/team.model";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const team = await teamModel.findById(req.params.id);
  if (!team) return res.status(StatusCodes.BAD_REQUEST).send("Team not found!");

  if (req.userInfo._id != team.owner.id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("You are not allowed to do that!");

  const raports = await raportModel.find();

  return res.status(StatusCodes.OK).send(team);
};
