import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import Raport from "../../interfaces/raport.interface";
import raportModel from "../../models/raport.model";
import userModel from "../../models/user.model";

import validateRaport from "./validateRaport";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const user = await userModel.findById(req.userInfo._id);
  if (!user) return res.status(StatusCodes.BAD_REQUEST).send("User not found!");

  let exists = false;
  let team: any;

  user.teams?.forEach((userTeam, i) => {
    if (userTeam.teamId == req.params.teamId) {
      exists = true;
      team = userTeam;
    }
  });
  if (!exists)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("This team does not exist!");

  const raportData: Raport = {
    ...req.body,
    author: { name: req.userInfo.name, id: req.userInfo._id },
    team: { name: team.teamName, id: team.teamId },
  };

  const { error } = validateRaport(raportData);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const raport = new raportModel({ ...req.body });
  user.reports?.push({ reportId: raport._id, reportName: raport.name });

  await raport.save();
  await user.save();

  return res.status(StatusCodes.OK).send("Protocol successfully saved!");
};
