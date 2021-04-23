import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../models/team.model";

const findTeam = async (req: Request, res: Response, next: NextFunction) => {
  const team = await teamModel.findById(req.params.teamId);
  if (!team) return res.status(StatusCodes.NOT_FOUND).send("Team not found");

  res.locals.team = team;
  next();
};

export default findTeam;
