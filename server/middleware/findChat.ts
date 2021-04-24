import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import chatModel from "../models/chat.model";

const getChat = async (req: Request, res: Response, next: NextFunction) => {
  const chat = await chatModel.findById(req.params.id);
  if (!chat) return res.status(StatusCodes.NOT_FOUND).send("Chat not found");

  res.locals.chat = chat;
  next();
};

export default getChat;
