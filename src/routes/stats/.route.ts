/* Import modules */
import { Router, Request, Response } from "express";
import fs from "fs";
import { join } from "path";

// Export router
export default (urlName: string): Router => {
  const api = Router();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  api.get(`/${urlName}`, (req: Request, res: Response) => {
    const raw = fs.readFileSync(
      join(__dirname, "..", "..", "util", "data", "stats.json")
    );
    const stats = JSON.parse(String(raw));

    res.status(200).json(stats);
  });

  return api;
};
