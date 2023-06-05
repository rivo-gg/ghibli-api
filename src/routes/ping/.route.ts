/* Import modules */
import { Router, Request, Response } from "express";

let apiLatency = 0;

// Export router
export default (urlName: string): Router => {
  const api = Router();

  // Get latency in ms
  api.get(`/${urlName}`, (req: Request, res: Response) => {
    res.status(200).json("Pong! 🏓");
  });

  return api;
};
