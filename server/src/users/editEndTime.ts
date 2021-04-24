import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

import userModel from "../../models/user.model";
import validateTime from "./validateEndTime";
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

  user.workTime = calculateTime(user.startTime, user.endTime);
  user.endTime = req.body.endTime;
  await user.save();

  res
    .status(StatusCodes.OK)
    .send(
      _.pick(user, [
        "_id",
        "name",
        "email",
        "workTime",
        "startTime",
        "endTime",
        "breakTime",
        "periodTime",
      ])
    );
};
