import { Response, Request } from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";

import validateEmail from "./validateEmail";
import sendEmail from "../utils/email";
import userModel from "../../models/user.model";

export default async (req: Request, res: Response) => {
  const { error } = validateEmail(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const { email } = req.body;
  const user = await userModel.findOne({ email }).select("id name email");
  if (!user) return res.status(StatusCodes.BAD_REQUEST).send("User not found");

  const token = user.generateAuthToken();
  const url = `http://${process.env.BACKEND_ADDRESS}/users/confirmation/${token}`;
  const message = await sendEmail(email, url);

  res.status(StatusCodes.OK).send(message);
};
