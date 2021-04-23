import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const team = await teamModel.findById(req.params.teamId);
  if (!team)
    return res.status(StatusCodes.NOT_FOUND).send("Team was not found!");

  const user = await userModel.findById(req.body.id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found!");

  if (req.userInfo._id != team.owner.id && req.userInfo._id != user._id)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("You are not allowed to do that!");

  user.teamInvitation?.forEach((invite: any, i: number) => {
    if (invite.teamId === team.id) user.teamInvitation?.splice(i, 1);
  });

  team.invitations.forEach((invite: any, i: number) => {
    if (invite.userId === user.id) team.invitations.splice(i, 1);
  });

  await team.save();
  await user.save();

  return res.status(StatusCodes.OK).send("Invite deleted Succesfully!");
};
