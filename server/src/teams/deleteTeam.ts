import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

export default async (req: Request, res: Response) => {
  const team = await teamModel.findByIdAndDelete(req.params.teamId);
  if (!team) return res.status(StatusCodes.BAD_REQUEST).send("Team not found!");

  const user = await userModel.findById(req.userInfo._id);

  if (user!._id != team.owner.id)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("You are not allowed to do that!");

  // For every user in team
  team.users.forEach(async (teamUser) => {
    const currentUser = await userModel.findById(teamUser.id);

    await currentUser?.teams?.forEach(async (userTeam: any, i: number) => {
      if (userTeam.teamId == team!.id) {
        // delete all user raports from this team
        currentUser.reports?.forEach((report: any, i: number) => {
          if (report.teamId === userTeam.teamId) currentUser.reports?.splice(i, 1);
        });

        // delete all user tasks from this team
        currentUser.tasks?.forEach((task: any, i: number) => {
          if (task.teamId === userTeam.teamId) currentUser.tasks?.splice(i, 1);
        });

        //delete all user chats from this team
        currentUser.chats?.forEach((chat: any, i: number) => {
          if (chat.teamId === userTeam.teamId) currentUser.chats?.splice(i, 1);
        });

        // delete invite is is from team that is about to be deleted
        currentUser.teamInvitation?.forEach((invitation: any, i: number) => {
          if (invitation.teamId === userTeam.teamId)
            currentUser.teamInvitation?.splice(i, 1);
        });

        // delete team from user teams
        currentUser.teams?.splice(i, 1);

        await currentUser!.save();
      }
    });
  });

  // await taskModel.deleteMany({ team: { id: team.id } });

  await team.delete();

  return res.status(StatusCodes.OK).send("Protocol successfully saved!");
};
