/* Import modules */
import { Router, Request, Response } from "express";

// Export router
export default (urlName: string): Router => {
  const api = Router();


  api.get(`/${urlName}`, (req: Request, res: Response) => {
    /* Code */
  });

  return api;
};
