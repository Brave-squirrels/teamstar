import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import taskModel from "../../models/task.model";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";
import validateCreateTask from "./validateCreateTask";

export enum STATUS {
  DONE,
  TODO,
  INPROGRESS,
}


// Function for creating a new user
export default async (req: Request, res: Response) => {
  const user = await userModel.findById(req.userInfo._id);
  const team = await teamModel.findById(req.params.teamId);
  if (!team)
    return res.status(StatusCodes.NOT_FOUND).send("Team was not found!");

  let exists = false;
  team.users.forEach((teamUser) => {
    if (teamUser.id == user.id) exists = true;
  });
  if (!exists)
    return res.status(StatusCodes.BAD_REQUEST).send("Its not your team!");

  const taskData = {
    ...req.body,
    team: { teamName: team.name, teamId: team._id },
  };

  const { error } = validateCreateTask(taskData);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const task = new taskModel(taskData);

  team.tasks.push({ name: req.body.name, userName: req.userInfo.name, userId: req.userInfo._id, id: task._id, status: STATUS.TODO });

  await team.save();
  await task.save();

  return res.status(StatusCodes.OK).send("Task created Succesfully!!");
};
