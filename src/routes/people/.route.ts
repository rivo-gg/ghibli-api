/* Import modules */
import { Router, Request, Response } from "express";

// Export router
export default (urlName: string, data: any): Router => {
  const api = Router();


  api.get(`/${urlName}:id`, (req: Request, res: Response) => {
    let searchData = [];

    if (req.params.id.split("-").length == 5) {
      searchData = data.people.filter(
        (p: any) => p.id == req.params.id.toLowerCase()
      );
    } else {
      searchData = data.people.filter((p: any) =>
        p.name.includes(req.params.id.toLowerCase())
      );
    }

    if (searchData.length == 0) {
      res.status(404).json(null);
    } else {
      res.status(200).json(searchData);
    }
  });

  return api;
};
