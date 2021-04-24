import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import chatModel from "../../models/chat.model";

export default async (req: Request, res: Response) => {
  const chat = await chatModel.find();
  res.status(StatusCodes.OK).send(chat);
};
