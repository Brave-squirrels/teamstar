import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import bcrypt from "bcrypt";

import validatePassword from "./validatePassword";
import userModel from "../../models/user.model";

const changePassword = async (req: Request, res: Response) => {
  const { error } = validatePassword(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  let user = await userModel.findById(req.userInfo._id);
  if (!user)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Can not read the user.");

  if (req.body.password !== req.body.confirmPassword)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("New password and confirm password must be the same.");

  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (!validPassword)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("Invalid current password.");

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);

  user = await userModel.findByIdAndUpdate(
    req.userInfo._id,
    { password: newPassword },
    { new: true }
  );
  if (!user)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Password not saved");

  res.status(StatusCodes.OK).send(_.pick(user, ["_id", "name", "email"]));
};

export default changePassword;
