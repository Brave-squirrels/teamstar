import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";
import validateCreateTeam from "./validateCreateTeam";

// Function for creating a new user
export default async (req: Request, res: Response) => {
  const user = await userModel.findById(req.userInfo._id);

  const teamData = {
    ...req.body,
    owner: {
      name: user!.name,
      id: user!._id,
    },
  };

  const { error } = validateCreateTeam(teamData);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const team = new teamModel(teamData);
  user?.teams?.push({ teamId: team._id, teamName: team.name });
  team.users.push({ name: user.name, id: user._id });

  await team.save();
  await user!.save();

  return res.status(StatusCodes.OK).send("Team Created Succesfully!");
};
