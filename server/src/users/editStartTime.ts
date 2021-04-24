import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

import userModel from "../../models/user.model";
import validateTime from "./validateStartTime";

export default async (req: Request, res: Response) => {
  const { error } = validateTime(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await userModel.findByIdAndUpdate(
    req.userInfo._id,
    { startTime: req.body.startTime },
    { new: true }
  );
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  res
    .status(StatusCodes.OK)
    .send(_.pick(user, ["_id", "name", "email", "startTime", "endTime"]));
};
