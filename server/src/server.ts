import "dotenv/config";
import config from "config";
import App from "./app/app";
import validateEnv from "./app/validateEnv";

import UserController from "../controllers/users.controller";
import LoginController from "../controllers/login.controller";

// Check if private key exist
if (!config.get("jwtPrivateKey")) {
  console.error("Fatal Error: jwtPrivateKey is not defined.");
  process.exit(1);
}

console.log(config.get("nodeEnv"));

// Validatin enivronmental variables
validateEnv();

// Starting app
const app = new App([
  // Adding all controllers
  new UserController(),
  new LoginController(),
]);

// Express app listen
const server = app.listen();

module.exports = server;
