import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import taskModel from "../../models/task.model";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const team = await teamModel.findById(req.params.teamId);
  if (!team)
    return res.status(StatusCodes.NOT_FOUND).send("Team was not found!");

  if (req.userInfo.id !== team.owner.id)
    return res.status(StatusCodes.BAD_REQUEST).send("You cant do that!");

  const user = await userModel.findOne({ email: req.body.email });

  const task = await taskModel.findById(req.params.taskId);

  task.users.forEach((taskUser, i) => {
    if (taskUser.userId === user.id) task.users.splice(i, 1);
  });

  user.tasks.forEach((userTask, i) => {
    if (userTask.taskId === task.id) user.tasks.splice(i, 1);
  });

  await task.save();
  await user.save();

  return res
    .status(StatusCodes.OK)
    .send("User deleted from task Succesfully!!");
};
