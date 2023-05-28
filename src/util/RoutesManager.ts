/* Import packages */
import express, { Router } from "express";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
const chalk = require("chalk");

// Export handler
export default (): Router => {
  const api: Router = Router();

  // Read route directory
  const routeDir = readdirSync(join(__dirname, "..", "routes"));
  const dataRaw = readFileSync(join(__dirname, "data", "data.json"));

  const data = JSON.parse(String(dataRaw));

  // For each route
  routeDir
    .filter((fileName: string) => fileName.endsWith(".route.ts"))
    .forEach((fileName: string) => {
      api.use(
        `/`,
        require(`../routes/${fileName}`).default(
          `${fileName.replace(".route.ts", "").replace("_", ":")}`,
          data
        )
      );

      console.log(
        chalk.red("API") +
          chalk.grey(" | ") +
          chalk.white(
            `Loaded route ${chalk.greenBright(
              "/" + fileName.replace(".route.ts", "").replace("_", ":")
            )}`
          )
      );
    });

  // For each folder
  routeDir
    .filter((folderName: string) => !folderName.includes("."))
    .forEach((folderName: string) => {
      // read sub route directory
      const subRouteDir = readdirSync(
        join(__dirname, "..", "routes", folderName)
      );

      // For each route
      subRouteDir
        .filter((fileName: string) => fileName.endsWith(".route.ts"))
        .forEach((fileName: string) => {
          api.use(
            `/${folderName}`,
            require(`../routes/${folderName}/${fileName}`).default(
              `${fileName.replace(".route.ts", "").replace("_", ":")}`,
              data
            )
          );

          console.log(
            chalk.red("API") +
              chalk.grey(" | ") +
              chalk.white(
                `Loaded route ${chalk.greenBright(
                  "/" +
                    folderName +
                    "/" +
                    fileName.replace(".route.ts", "").replace("_", ":")
                )}`
              )
          );
        });

      // For each folder
      subRouteDir
        .filter((subFolderName: string) => !subFolderName.includes("."))
        .forEach((subFolderName: string) => {
          // read folder directory
          const folderDir = readdirSync(
            join(__dirname, "..", "routes", folderName, subFolderName)
          );

          // For each route
          folderDir
            .filter((fileName: string) => fileName.endsWith(".route.ts"))
            .forEach((fileName: string) => {
              api.use(
                `/${folderName}/${subFolderName}`,
                require(`../routes/${folderName}/${subFolderName}/${fileName}`).default(
                  `${fileName.replace(".route.ts", "").replace("_", ":")}`,
                  data
                )
              );

              console.log(
                chalk.red("API") +
                  chalk.grey(" | ") +
                  chalk.white(
                    `Loaded route ${chalk.greenBright(
                      "/" +
                        folderName +
                        "/" +
                        subFolderName +
                        "/" +
                        fileName.replace(".route.ts", "").replace("_", ":")
                    )}`
                  )
              );
            });
        });
    });

  api.get("*", (req, res) =>
    res.status(404).send(`Can't ${req.method} ${req.url}`)
  );

  return api;
};
