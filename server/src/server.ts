import "dotenv/config";
import App from "./app/app";
import validateEnv from "./app/validateEnv";

import DefaultController from "../controllers/default.controller";
import UserController from "../controllers/users.controller";
import LoginController from "../controllers/login.controller";

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
  new DefaultController(),
  new UserController(),
  new LoginController(),
]);

// Express app listen
const server = app.listen();

module.exports = server;
