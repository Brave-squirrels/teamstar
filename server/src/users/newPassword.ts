import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import bcrypt from "bcrypt";
import userModel from "../../models/user.model";

const newPassword = async (req: Request, res: Response) => {
  if (req.body.password !== req.body.confirmPassword)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("New password and confirm password must be the same.");

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);

  const user = await userModel.findByIdAndUpdate(
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

export default newPassword;
