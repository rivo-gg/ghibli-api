/* Import packages */
const chalk = require("chalk");
import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
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

  let count: number = 0;

  if (process.env.ENABLE_LOGS) {
    api.use((req: Request, res: Response, next: NextFunction) => {
      if(req.method == "GET") { count++;}
      console.log(count)
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
