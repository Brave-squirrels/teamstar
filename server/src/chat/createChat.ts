import { Response, Request } from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";

import validateChat from "./validateChat";
import chatModel from "../../models/chat.model";
import userModel from "../../models/user.model";

// Function for creating a new chat
export default async (req: Request, res: Response) => {
  let { error } = validateChat(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await userModel.findById(req.userInfo._id);

  let chat = await chatModel.findOne({ teamId: req.body.teamId });
  if (chat)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("This team already has a chat.");

  chat = new chatModel({ ...req.body });
  await chat.save();

  user.chats.push({
    teamId: chat.teamId,
    chatId: chat._id,
    chatName: chat.name,
  });

  await user.save();

  return res.status(StatusCodes.OK).send(chat);
};
