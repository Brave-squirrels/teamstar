import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";
import validateCreateTask from "./validateCreateTask";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const user = await userModel.findById(req.userInfo._id);
  const team = await teamModel.findById(req.params.teamId);
  if (!team)
    return res.status(StatusCodes.NOT_FOUND).send("Team was not found!");

  const taskData = {
    ...req.body,
    team: { teamName: team.name, teamId: team._id },
  };

  const { error } = validateCreateTask(taskData);

  return res.status(StatusCodes.OK).send("Task created Succesfully!!");
};
