import { Response, Request } from "express";
import _ from "lodash";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import validateNewEmail from "./validateNewEmail";
import sendEmail from "../utils/emailEmailChange";
import userModel from "../../models/user.model";

export default async function sendChangeEmail(req: Request, res: Response) {
  const { error } = validateNewEmail(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const email = req.body.email;
  const newEmail = req.body.newEmail;
  const user = await userModel.findOne({ email }).select("id name email");
  if (!user) return res.status(StatusCodes.BAD_REQUEST).send("User not found");

  const newUser = await userModel.findOne({ email: newEmail });
  if (newUser) return res.status(StatusCodes.BAD_REQUEST).send('User with this email already exists');

  const token = user.generateAuthToken();
  const url = `http://${process.env.BACKEND_ADDRESS}/users/email/${token}/${newEmail}`;
  const message = await sendEmail(req.body.email, url);

  res.status(StatusCodes.OK).send(message);
}
