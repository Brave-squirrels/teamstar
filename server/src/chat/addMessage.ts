import { Response, Request } from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";

import validateMessage from "./validateMessage";
import chatModel from "../../models/chat.model";
import userModel from "../../models/user.model";

// Function for creating a new chat
export default async (req: Request, res: Response) => {
  let { error } = validateMessage(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = req.userInfo;

  const chat = res.locals.chat;

  chat.messages.push({
    authorName: user.name,
    authorId: user._id,
    ...req.body,
  });

  await chat.save();

  return res.status(StatusCodes.OK).send(chat);
};
