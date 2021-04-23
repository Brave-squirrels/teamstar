import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import validateEmail from "./validateEmail";
import userModel from "../../models/user.model";

const changeEmail = async (req: Request, res: Response) => {
  const { error } = validateEmail(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  let user = await userModel.findOne({ email: req.body.email });
  if (user)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("User with this email already exist.");

  user = await userModel.findByIdAndUpdate(
    req.userInfo._id,
    { email: req.body.email },
    { new: true }
  );
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  res.status(StatusCodes.OK).send(_.pick(user, ["_id", "name", "email"]));
};

export default changeEmail;
