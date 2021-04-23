import express, { Request, Response } from "express";

import auth from "../middleware/auth";
import findChat from "../middleware/findChat";
import createChat from "../src/chat/createChat";
import addMessage from "../src/chat/addMessage";

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
    this.router.post(`${this.path}/create`, auth, this.createChat);
    this.router.put(
      `${this.path}/message/add/:id`,
      auth,
      findChat,
      this.addMessage
    );
  }

  createChat(req: Request, res: Response) {
    createChat(req, res);
  }

  addMessage(req: Request, res: Response) {
    addMessage(req, res);
  }
}
