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

  if (req.userInfo._id != team.owner.id)
    return res.status(StatusCodes.BAD_REQUEST).send("You cant do that!");

  const task = await taskModel.findById(req.params.taskId);


  team.tasks.forEach((teamTask, i) => {
    if (teamTask.id == task.id) team.tasks.splice(i, 1);
  })

  await task.delete();
  await task.save();

  return res.status(StatusCodes.OK).send("Task deleted Succesfully!!");
};
