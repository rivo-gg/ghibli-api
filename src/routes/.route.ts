/* Import modules */
import { Router, Request, Response } from "express";

// Export router
export default (urlName: string): Router => {
  const api = Router();


  api.get(`/${urlName}`, (req: Request, res: Response) => {
    res.status(302).redirect("/docs");
  });

  return api;
};
