/* Import modules */
import { Router, Request, Response } from "express";

// Export router
export default (urlName: string, data: any): Router => {
  const api = Router();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  api.get(`/${urlName}:id`, (req: Request, res: Response) => {
    const searchData = data.vehicles.filter((v: any) => v.id == req.params.id);

    res.json(searchData);
  });

  return api;
};
