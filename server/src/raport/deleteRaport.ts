import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import raportModel from "../../models/raport.model";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const user = await userModel.findById(req.userInfo._id);

  const raport = await raportModel.findById(req.params.raportId);
  if (!raport)
    return res.status(StatusCodes.BAD_REQUEST).send("Raport not found!");

  const team = await teamModel.findById(raport.team.id);

  team!.raports.forEach((raport: any, i: number) => {
    if (raport.id == req.params.raportId) team!.raports.splice(i, 1);
  });

  user?.reports?.forEach((raport: any, i: number) => {
    if (raport.reportId == req.params.raportId) user.reports?.splice(i, 1);
  });

  await raport.delete();
  await user!.save();
  await team!.save();

  return res.status(StatusCodes.OK).send("Protocol deleted successfully!");
};
