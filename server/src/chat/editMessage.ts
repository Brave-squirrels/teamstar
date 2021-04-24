import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

import validateMessage from "./validateMessage";
import chatModel from "../../models/chat.model";
import userModel from "../../models/user.model";

export default async (req: Request, res: Response) => {
  const { error } = validateMessage(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await userModel.findById(req.userInfo._id);

  const message = res.locals.message;

  if (user._id.toString() != message[0].authorId.toString()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("You are not allowed to do that!");
  }

  let chat = (
    await chatModel.find({
      "messages._id": req.params.id,
    })
  )[0];

  chat.messages.forEach((m, i) => {
    if (m._id.toString() === message[0]._id.toString())
      chat.messages[i].content = req.body.content;
  });

  await chat.save();
  res.status(StatusCodes.OK).send(chat);
};
