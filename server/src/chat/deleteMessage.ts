import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

import userModel from "../../models/user.model";

export default async (req: Request, res: Response) => {
  const user = await userModel.findById(req.userInfo._id);

  const message = res.locals.message;
  const chat = res.locals.chat[0];

  if (user._id.toString() != message[0].authorId.toString()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("You are not allowed to do that!");
  }

  // Update message
  chat.messages.forEach((m, i) => {
    if (m._id.toString() === message[0]._id.toString())
      chat.messages.splice(i, 1);
  });
  await chat.save();

  res.status(StatusCodes.OK).send(chat);
};
