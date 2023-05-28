/* Import modules */
import { Router, Request, Response } from "express";

// Export router
export default (urlName: string): Router => {
  const api = Router();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  api.get(`/${urlName}`, (req: Request, res: Response) => {
    res.send("Online");
  });

  return api;
};
