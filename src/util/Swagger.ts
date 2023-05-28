/* Import packages */
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Express } from "express";
import { join } from "path";
import { readFileSync } from "fs";

export default (api: Express) => {
  const packageDataRaw = readFileSync(
    join(__dirname, "..", "..", "package.json")
  );
  const packageData = JSON.parse(String(packageDataRaw));

  api.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(
      swaggerJsDoc({
        failOnErrors: true,
        definition: {
          openapi: "3.0.0",
          info: {
            title: "Ghibli API",
            version: packageData.version ? packageData.version : "0.0.0",
            description:
              "The unofficial API for everything related to Ghibli Studios.",
          },
        },
        apis: [join(__dirname, "..", "docs") + "/*.ts"],
      }),
      {
        explorer: false,
        customJs: `/assets/js/swagger.js`,
        customCssUrl: `/assets/css/swagger.css`,
        customSiteTitle: "Ghibli API",
      }
    )
  );

  return api;
};
