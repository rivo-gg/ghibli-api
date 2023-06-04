/* Import packages */
const chalk = require("chalk");
import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { join } from "path";

// Export middleware
export default (api: Express): Express => {
  // Set trust proxy
  api.set("trust proxy", 1);

  // Static files
  api.use("/assets", express.static(join(__dirname, "..", "assets")));

  // Parse body
  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({ extended: true }));

  // Initialize cors
  api.use(
    cors({
      origin: "*",
      methods: ["GET"],
    })
  );

  if (process.env.ENABLE_LOGS == "true") {
    api.use((req: Request, res: Response, next: NextFunction) => {
      console.log(
        chalk.yellow("CALL") +
          chalk.grey(" | ") +
          chalk.white(
            `New request to ${chalk.greenBright(
              `${req.method}: ${req.url} (${req.ip})`
            )}`
          )
      );

      next();
    });
  }

  // Connect to MongoDB
mongoose.connect(process.env.MONGOURI || "", {

})
  .then(() => console.log(
    chalk.red("DB") +
      chalk.grey(" | ") +
      chalk.white(`Sucesfully connected to ${chalk.greenBright("MongoDB")}`)
  ))
  .catch((error) => console.error("MongoDB connection error:", error));

  // Set port
  api.listen(6543, () => {
    console.log(
      chalk.red("API") +
        chalk.grey(" | ") +
        chalk.white(`Listening on port ${chalk.greenBright("6543")}`)
    );
  });

  return api;
};
