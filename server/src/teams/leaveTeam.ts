import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import raportModel from "../../models/raport.model";
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
    console.log(teamUser.id == user.id)
    console.log(1)
    if (teamUser.id == user.id) {
      team.users.splice(i, 1);
      return team
    }
  });

  // deleting raports from team
  await team.raports.forEach(async (raport: any, i: number) => {
    console.log(raport.userId == user.id)
    console.log(2)
    if (raport.userId == user.id) {
      team.raports.splice(i, 1);
      // deleting user raports
      await raportModel.findByIdAndDelete(raport.id);
    }
  });

  // deleting raports from user
  user.reports?.forEach((raport: any, i: number) => {
    console.log(raport.teamId == team.id)
    console.log(3)
    if (raport.teamId == team.id) user.reports?.splice(i, 1);
    
  });

  // deleting team from user teams
  user.teams?.forEach((userTeam: any, i: number) => {
    console.log(userTeam.teamId == team.id)
    console.log(4)
    if (userTeam.teamId == team.id) user.teams.splice(i, 1)
    
  });

  // deleting user tasks from team
  user.tasks?.forEach((task: any, i: number) => {
    console.log(task.userId == user.id)
    console.log(5)
    if (task.userId == user.id) user.tasks?.splice(i, 1);
    
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
