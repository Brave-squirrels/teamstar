import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import taskModel from "../../models/task.model";
import teamModel from "../../models/team.model";
import validateStatus from "./validateStatus";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const team = await teamModel.findById(req.params.teamId);
  if (!team)
    return res.status(StatusCodes.NOT_FOUND).send("Team was not found!");
  const { error } = validateStatus(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const task = await taskModel.findById(req.params.taskId);

  task.status = req.body.status;

  team.tasks.forEach((task, i: number) => {
    if (task.id == req.params.taskId) {
      team.tasks[i].status = req.body.status;
    }
  })

  await team.save();
  await task.save();

  return res.status(StatusCodes.OK).send("Task created Succesfully!!");
};
