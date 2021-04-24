import express, { Application } from "express";
import loggerMiddleware from "../../middleware/logger";
import Controller from "../../interfaces/controller.interface";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
const cors = require("cors");
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import changeConnectionStatus from '../../src/users/changeConnectionStatus';

import userModel from "../../models/user.model";


/**
 * Main App class, responsible for initializing middlewares,
 * connecting to database, running local server
 */

export default class App {
  public app: Application;
  private port = process.env.PORT;
  /*  private limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100,
   }); */
  private httpServer: any;


  constructor(controllers: Controller[]) {
    this.app = express();
    this.app.set("trust proxy", 1);
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeSocket();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(loggerMiddleware);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    /* this.app.use(this.limiter); */
  }

  private initializeSocket() {
    this.httpServer = createServer(this.app);
    const io = new Server(this.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    io.on("connection", async (socket: Socket) => {
      if (socket.handshake.headers.token !== "null") {
        let online = await changeConnectionStatus(socket.handshake.headers.token, true);
      }



      socket.on("chat-message", data => {
        io.emit('message', data)
      });

      socket.on("disconnect", async (reason) => {
        if (socket.handshake.headers.token !== "null") {
          let offline = await changeConnectionStatus(socket.handshake.headers.token, false);
        }
      })

    });

  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private connectToDatabase() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_DB_NAME } = process.env;

    const dbName = !!process.env.MONGO_DB_NAME
      ? <string>process.env.MONGO_DB_NAME
      : MONGO_DB_NAME;

    mongoose
      .connect(`mongodb+srv://@hackathon.bwwtn.mongodb.net/`, {
        dbName: dbName,
        user: MONGO_USER,
        pass: MONGO_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => console.log(`Connected to MongoDB ${dbName}...`))
      .catch((err) => console.log(err.message));
  }



  public listen() {
    return this.httpServer.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
