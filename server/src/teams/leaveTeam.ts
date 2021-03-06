import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import raportModel from "../../models/raport.model";
import taskModel from "../../models/task.model";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

export default async (req: Request, res: Response) => {
  const team = await teamModel.findById(req.params.teamId);
  if (!team) return res.status(StatusCodes.BAD_REQUEST).send("Team not found!");

  if (req.userInfo._id == team.owner.id && team.users.length > 1)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(
        "You can't leave them as it's owner, while there are still other users!"
      );

  const user = await userModel.findById(req.userInfo._id);
  if (!user) return res.status(StatusCodes.BAD_REQUEST).send("User not found!");

  // deleting user from team users
  team.users.forEach((teamUser: any, i: number) => {
    if (teamUser.id == req.params.teamID) {
      team.users.splice(i, 1);
      return team;
    }
  });

  // deleting raports from team
  await team.raports.forEach(async (raport: any, i: number) => {
    if (raport.userId == req.params.teamId) {
      team.raports.splice(i, 1);
      // deleting user raports
      await raportModel.findByIdAndDelete(raport.id);
    }
  });

  // deleting raports from user
  user.reports?.forEach((raport: any, i: number) => {
    if (raport.teamId == req.params.teamId) user.reports?.splice(i, 1);
  });

  // deleting team from user teams
  user.teams?.forEach((userTeam: any, i: number) => {
    if (userTeam.teamId == req.params.teamId) user.teams.splice(i, 1);
  });

  // deleting user tasks from team
  user.tasks?.forEach((task: any, i: number) => {
    if (task.userId == req.params.teamId) user.tasks?.splice(i, 1);
  });

  user.chats?.forEach((chat: any, i: number) => {
    if (chat.teamId == req.params.teamId) user.chats?.splice(i, 1);
  });

  // deleting user from team tasks
  await team.tasks.forEach(async (teamTask) => {
    if (teamTask.userId.toString() === user._id.toString()) {
      const task = await taskModel.findById(teamTask.id);
      await task.users.forEach(async (taskUser: any, i: number) => {
        if (taskUser.id.toString() === user._id.toString())
          task.users.splice(i, 1);
      });
    }
  });

  await user.save();
  if (team.users.length === 0) {
    await team.delete();
  } else {
    await team.save();
  }

  return res.status(StatusCodes.OK).send("Protocol successfully saved!");
};
