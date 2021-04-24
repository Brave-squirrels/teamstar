import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import taskModel from "../../models/task.model";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  let user = await userModel.findById(req.userInfo._id);
  const team = await teamModel.findById(req.params.teamId);
  if (!team)
    return res.status(StatusCodes.NOT_FOUND).send("Team was not found!");

  let exists = false;
  team.users.forEach((teamUser) => {
    if (teamUser.id === user.id) exists = true;
  });
  if (!exists)
    return res.status(StatusCodes.BAD_REQUEST).send("Its not your team!");

  user = await userModel.findOne({ email: req.body.email });
  exists = false;
  team.users.forEach((teamUser) => {
    if (teamUser.id === user.id) exists = true;
  });
  if (!exists)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("User does not belong to this team!");

  const task = await taskModel.findById(req.params.taskId);
  task.users.push({ userName: user.name, userId: user.id });

  user.tasks.push({ taskId: task.id, taskName: task.name, teamId: team.id });

  await task.save();
  await user.save();

  return res.status(StatusCodes.OK).send("User added to task Succesfully!!");
};
