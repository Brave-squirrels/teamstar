import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

import chatModel from "../models/chat.model";

const getMessage = async (req: Request, res: Response, next: NextFunction) => {
  const chat = await chatModel.find({
    "messages._id": req.params.id,
  });
  if (!chat.length)
    return res.status(StatusCodes.NOT_FOUND).send("Chat not found");

  const message = chat[0].messages.filter(
    (m) => m._id.toString() === req.params.id.toString()
  );

  res.locals.chat = chat;
  res.locals.message = message;
  next();
};

export default getMessage;
