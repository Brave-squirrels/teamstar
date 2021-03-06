import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

import userModel from "../../models/user.model";
import validateTime from "./validateTime";
import calculateTime from "../utils/calculateTime";

export default async (req: Request, res: Response) => {
  const { error } = validateTime(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  let user = await userModel.findById(req.userInfo._id);
  if (!user)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Can not read the user.");

  const result = calculateTime(req.body.startTime, req.body.endTime);
  if (!result)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("End time is earlier than start time");

  user.times = req.body;
  user.breakTime = result;

  await user.save();

  res.status(StatusCodes.OK).send(result);
};
