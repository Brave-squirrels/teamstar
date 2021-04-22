import express, { Application } from "express";
import loggerMiddleware from "../../middleware/logger";
import Controller from "../../interfaces/controller.interface";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
const cors = require("cors");

/**
 * Main App class, responsible for initializing middlewares,
 * connecting to database, running local server
 */

export default class App {
  public app: Application;
  private port = process.env.PORT;
  private limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });

  constructor(controllers: Controller[]) {
    this.app = express();
    this.app.set("trust proxy", 1);
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(loggerMiddleware);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(this.limiter);
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
    return this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
