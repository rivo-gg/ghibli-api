/* Import packages */
const chalk = require("chalk");
import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { join } from "path";
import fs from "fs";

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
      const urls = [
        "/films",
        "/films/random",
        "/locations",
        "/locations/random",
        "/people",
        "/people/random",
        "/ping",
        "/stats",
        "/species/",
        "/species/random",
        "/vehicles",
        "/vehicles/random",
        "/invite",
        "/donate",
        "/",
      ];

      if (req.method == "GET" && urls.includes(req.url.split("?")[0])) {
        const raw = fs.readFileSync(join(__dirname, "data", "stats.json"));
        const stats = JSON.parse(String(raw));

        const today = new Date();

        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // January is 0
        const year = currentDate.getFullYear();

        const formattedDate = `${day}.${month}.${year}`;
        const dateIdentifier = formattedDate;
        let statsToday = stats[dateIdentifier];
        if (!statsToday || statsToday == undefined) {
          stats[dateIdentifier] = [];
          statsToday = stats[dateIdentifier];
        }

        stats.total++;

        if (statsToday.find((s: any) => s.url == req.url.split("?")[0])) {
          statsToday.find((s: any) => s.url == req.url.split("?")[0]).req++;
        } else {
          statsToday.push({
            url: req.url.split("?")[0],
            req: 1,
          });
        }

        fs.writeFileSync(
          join(__dirname, "data", "stats.json"),
          JSON.stringify(stats, null, 2)
        );
      }

      if (urls.includes(req.url.split("?")[0])) {
        console.log(
          chalk.yellow("CALL") +
            chalk.grey(" | ") +
            chalk.white(
              `New request to ${chalk.greenBright(
                `${req.method}: ${req.url} (${req.ip})`
              )}`
            )
        );
      }

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
