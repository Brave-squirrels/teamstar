import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import raportModel from "../../models/raport.model";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

export default async (req: Request, res: Response) => {
  const team = await teamModel.findById(req.params.teamId);
  if (!team) return res.status(StatusCodes.BAD_REQUEST).send("Team not found!");

  if (req.userInfo._id != team.owner.id)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("You are not allowed to do that!");

  const user = await userModel.findById(req.params.id);
  if (!user) return res.status(StatusCodes.BAD_REQUEST).send("User not found!");

  // deleting user from team users
  team.users.forEach((teamUser: any, i: number) => {
    if (teamUser === user._id) {
      team.users.splice(i, 1);
      return;
    }
  });

  // deleting raports from team
  await team.raports.forEach(async (raport: any, i: number) => {
    if (raport.userId === user._id) {
      team.raports.splice(i, 1);
      // deleting user raports
      await raportModel.findByIdAndDelete(raport.userId);
    }
  });

  // deleting raports from user
  user.reports?.forEach((raport: any, i: number) => {
    if (raport.teamId === team._id) user.reports?.splice(i, 1);
  });

  // deleting team from user teams
  user.teams?.forEach((userTeam: any, i: number) => {
    if (userTeam.id === team._id) user.teams?.splice(i, 1);
  });

  // deleting user tasks from team
  user.tasks?.forEach((task: any, i: number) => {
    if (task.userId === user._id) user.tasks?.splice(i, 1);
  });

  // deleting user from team tasks
  // await team.tasks.forEach(async (teamTask) => {
  //   if (teamTask.userId === user._id) {
  //     const task = await taskModel.findById(teamTask.id);
  //     await task.users.forEach(async (taskUser: any, i: number) => {
  //       if (taskUser.id === user._id) task.users.splice(i, 1);
  //     });
  //   }
  // });

  await user.save();
  await team.save();

  return res.status(StatusCodes.OK).send("Protocol successfully saved!");
};
