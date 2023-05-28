/* Import packages */
import dotenv from "dotenv";
import express, { Express } from "express";

dotenv.config();

// Clear console
console.clear();

// Initialize dotenv
dotenv.config();

// Initialize express
let api: Express = express();

// Initialize swaggerUI
require("./util/Swagger").default(api);

// Initialize Routes
require("./util/Middleware").default(api);
api.use("/", require("./util/RoutesManager").default(api));
