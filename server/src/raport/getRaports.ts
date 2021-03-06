import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import raportModel from "../../models/raport.model";
import teamModel from "../../models/team.model";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const team = await teamModel.findById(req.params.teamId);
  if (!team) return res.status(StatusCodes.BAD_REQUEST).send("Team not found!");

  let raports = await raportModel.find();
  if (!raports)
    return res.status(StatusCodes.BAD_REQUEST).send("Raports not found");
  const newRaports: any = [];
  raports.forEach((raport) => {
    if (raport.team.id == team.id) {
      newRaports.push(raport);
    }
  })

  return res.status(StatusCodes.OK).send(newRaports);
};
