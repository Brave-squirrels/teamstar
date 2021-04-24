import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import _ from "lodash";
import mongoose from "mongoose";
import userModel from "../../models/user.model";
import User from "../../interfaces/user.interface";

const changeEmail = async (req: Request, res: Response) => {
  const userInfo = (await jwt.verify(
    req.params.token,
    process.env.JWT_PRIVATE_KEY!
  )) as User & mongoose.Document<any>
  const user = await userModel.findByIdAndUpdate(
    userInfo._id,
    { email: req.params.newEmail },
    { new: true }
  );
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  return res.status(StatusCodes.OK).redirect(`http://${process.env.FRONT_ADDRESS}/emailChanged`);
};

export default changeEmail;
