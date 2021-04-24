import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import adUserToTask from "../src/tasks/adUserToTask";
import changeStatus from "../src/tasks/changeStatus";
import createTask from "../src/tasks/createTask";
import deleteTask from "../src/tasks/deleteTask";
import editTask from "../src/tasks/editTask";
import getTasks from "../src/tasks/getTasks";
import deleteUser from "../src/users/deleteUser";

/**
 * raport Class,
 * responsible for managing CRUD operations inside of raports
 */
export default class TaskController {
  public path = "/teams/:teamId/tasks";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, auth, this.getTasks);
    this.router.post(this.path, auth, this.createTask);
    this.router.put(`${this.path}/:taskId/addUser`, auth, this.addUser);
    this.router.put(`${this.path}/:taskId/deleteUser`, auth, this.deleteUser);
    this.router.put(
      `${this.path}/:taskId/changeStatus`,
      auth,
      this.changeStatus
    );
    this.router.put(`${this.path}/:taskId/editTask`, auth, this.editTask);
    this.router.delete(`${this.path}/:taskId`, auth, this.deleteTask);
  }

  getTasks(req: Request, res: Response) {
    getTasks(req, res);
  }

  createTask(req: Request, res: Response) {
    createTask(req, res);
  }

  addUser(req: Request, res: Response) {
    adUserToTask(req, res);
  }

  deleteUser(req: Request, res: Response) {
    deleteUser(req, res);
  }

  editTask(req: Request, res: Response) {
    editTask(req, res);
  }

  changeStatus(req: Request, res: Response) {
    changeStatus(req, res);
  }

  deleteTask(req: Request, res: Response) {
    deleteTask(req, res);
  }
}
