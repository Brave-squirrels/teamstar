import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const team = await teamModel.findById(req.params.teamId);
  if (!team)
    return res.status(StatusCodes.NOT_FOUND).send("Team was not found!");

  if (req.userInfo._id != team.owner.id)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("You are not allowed to do that!");

  const user = await userModel.findById(req.body.id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found!");

  user.teamInvitation.push({ teamId: team._id, teamName: team.name });
  team.invitations.push({ id: user._id, name: user.name });

  await team.save();
  await user.save();

  return res.status(StatusCodes.OK).send("Team Created Succesfully!");
};
