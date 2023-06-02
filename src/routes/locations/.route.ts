/* Import modules */
import { Router, Request, Response } from "express";

// Export router
export default (urlName: string, data: any): Router => {
  const api = Router();

  // Search by id
  api.get(`/${urlName}:id`, (req: Request, res: Response) => {
    let searchData = [];

    searchData = data.locations.filter(
      (l: any) => l.id == req.params.id.toLowerCase()
    );

    if (searchData.length == 0) {
      res.status(404).json(null);
    } else {
      res.status(200).json(searchData);
    }
  });

  // Search by title
  api.get(`/${urlName}`, (req: Request, res: Response) => {
    let searchData = [];

    searchData = data.locations.filter((l: any) =>
      String(l.name)
        .toLowerCase()
        .includes(String(req.query.search).toLowerCase())
    );

    if (!req.query.search) searchData = data.locations;

    if (searchData.length == 0) {
      res.status(404).json(null);
    } else {
      res.status(200).json(searchData);
    }
  });

  return api;
};
