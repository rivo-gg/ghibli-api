/* Import modules */
import { Router, Request, Response } from "express";

// Export router
export default (urlName: string): Router => {
  const api = Router();

  // Returns Pong
  api.get(`/${urlName}`, (req: Request, res: Response) => {
    res.status(200).json({ ping: "Pong! 🏓" });
  });

  return api;
};
