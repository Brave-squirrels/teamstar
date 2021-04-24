import express, { Request, Response } from "express";

import auth from "../middleware/auth";
import findChat from "../middleware/findChat";
import findMessage from "../middleware/findMessage";
import createChat from "../src/chat/createChat";
import addMessage from "../src/chat/addMessage";
import editMessage from "../src/chat/editMessage";
import getAllChats from "../src/chat/getAllChats";
import deleteMessage from "../src/chat/deleteMessage";

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

    this.router.get(`${this.path}`, this.getAllChats);

    this.router.put(
      `${this.path}/message/add/:id`,
      auth,
      findChat,
      this.addMessage
    );
    this.router.put(
      `${this.path}/message/edit/:id`,
      auth,
      findMessage,
      this.editMessage
    );

    this.router.delete(
      `${this.path}/message/delete/:id`,
      auth,
      findMessage,
      this.deleteMessage
    );
  }

  createChat(req: Request, res: Response) {
    createChat(req, res);
  }

  getAllChats(req: Request, res: Response) {
    getAllChats(req, res);
  }

  addMessage(req: Request, res: Response) {
    addMessage(req, res);
  }

  editMessage(req: Request, res: Response) {
    editMessage(req, res);
  }

  deleteMessage(req: Request, res: Response) {
    deleteMessage(req, res);
  }
}
