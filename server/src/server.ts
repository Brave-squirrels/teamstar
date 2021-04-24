import "dotenv/config";
import App from "./app/app";
import validateEnv from "./app/validateEnv";

require("./scrapper/scrapper");

import UserController from "../controllers/users.controller";
import LoginController from "../controllers/login.controller";
import ChatController from "../controllers/chat.controller";
import TeamController from "../controllers/team.controller";
import RaportController from "../controllers/raport.controller";
import CalendarController from "../controllers/calendar.controller";

// Check if private key exist
if (!process.env.JWT_PRIVATE_KEY) {
  console.error("Fatal Error: jwtPrivateKey is not defined.");
  process.exit(1);
}

// Validatin enivronmental variables
validateEnv();

// Starting app
const app = new App([
  // Adding all controllers
  new UserController(),
  new LoginController(),
  new ChatController(),
  new TeamController(),
  new RaportController(),
  new CalendarController()
]);

// Express app listen

const server = app.listen();

module.exports = server;
