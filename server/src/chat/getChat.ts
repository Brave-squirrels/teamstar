import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import chatModel from "../../models/chat.model";
import userModel from "../../models/user.model";

export default async (req: Request, res: Response) => {
  const chat = await chatModel.findById(req.params.chatId);
  if(!chat) { return res.status(StatusCodes.BAD_REQUEST).send("There is no chat!")};

  const users = await userModel.find({"chats": {"$elemMatch": {"chatId": req.params.chatId}}}).select("-password");

  const isFromChat = users.filter(user => user._id==req.userInfo._id)

  if(isFromChat.length===0) { return res.status(StatusCodes.UNAUTHORIZED).send("You are not allowed to do that")};

  res.status(StatusCodes.OK).send(chat);
};
