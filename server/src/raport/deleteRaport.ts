import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import raportModel from "../../models/raport.model";
import userModel from "../../models/user.model";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const user = await userModel.findById(req.userInfo._id);

  const deleted = raportModel.findByIdAndDelete(req.body.id);
  if (!deleted)
    return res.status(StatusCodes.BAD_REQUEST).send("Raport not found!");

  const team = await teamModel.findById(deleted.team.id);

  team!.raports.forEach((raport: any, i: number) => {
    if (raport.id === req.body.raportId) team!.raports.splice(i, 1);
  });

  user!.raports.forEach((raport: any, i: number) => {
    if (raport.id === req.body.raportId) user!.raports.splice(i, 1);
  });

  await user!.save();
  await team!.save();

  return res.status(StatusCodes.OK).send("Protocol deleted succesfully!");
};
