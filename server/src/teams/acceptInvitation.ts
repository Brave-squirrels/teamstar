import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { stubArray } from "lodash";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const teamFromInvitation = req.body.invitation;

  const team = await teamModel.findById(teamFromInvitation.teamId);
  if (!team) return res.status(StatusCodes.BAD_REQUEST).send("Team not found!");

  const user = await userModel.findById(req.userInfo._id);

  if (teamFromInvitation.teamId !== team.id)
    return res.status(StatusCodes.BAD_REQUEST).send("Something went wrong!");

  // deleting invite in team
  team.invitations.forEach((invitation, i) => {
    if (invitation.userId == user.id) team.invitations.splice(i, 1);
  });

  //deleting invite in user
  user.teamInvitation.forEach((invite, i) => {
    if (invite.teamId == team.id) user.teamInvitation.splice(i, 1);
  });

  // adding user to team
  user.teams.push({ teamId: team.id, teamName: team.name });
  // adding team to user
  team.users.push({ name: user.name, id: user.id });

  await team.save();
  await user.save();

  return res.status(StatusCodes.OK).send("Succesfully joined the team!");
};
