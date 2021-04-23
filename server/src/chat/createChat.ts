import { Response, Request } from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";

import validateChat from "./validateChat";
import chatModel from "../../models/chat.model";

// Function for creating a new chat
export default async (req: Request, res: Response) => {
  let { error } = validateChat(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  let chat = await chatModel.findOne({ teamId: req.body.teamId });
  if (chat)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("This team already has a chat.");

  chat = new chatModel({ ...req.body });
  chat = await chat.save();

  return res.status(StatusCodes.OK).send(chat);
};
