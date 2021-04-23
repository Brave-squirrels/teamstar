import express, { Request, Response } from "express";

import createChat from "../src/chat/createChat";

/**
 * Chat Class,
 * responsible for managing CRUD operations inside of /comments edpoint
 */
export default class ChatController {
  public path = "/chat";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/create`, this.createChat);
  }

  createChat(req: Request, res: Response) {
    createChat(req, res);
  }
}
