/* Import modules */
import { Router, Request, Response } from "express";

// Export router
export default (urlName: string, data: any): Router => {
  const api = Router();

  // Random
  api.get(`/${urlName}random`, (req: Request, res: Response) => {
    let searchData: any = [];

    searchData.push(
      data.vehicles[Math.round(Math.random() * (data.vehicles.length - 1) + 0)]
    );

    if (searchData.length == 0) {
      res.status(404).json(null);
    } else {
      res.status(200).json(searchData);
    }
  });

  // Search by id
  api.get(`/${urlName}`, (req: Request, res: Response) => {
    let searchData = [];

    if (req.query.id) {
      searchData = data.vehicles.filter(
        (v: any) => v.id == String(req.query.id).toLowerCase()
      );
    } else if (req.query.search) {
      searchData = data.vehicles.filter((v: any) =>
        String(v.name)
          .toLowerCase()
          .includes(String(req.query.search).toLowerCase())
      );
    } else {
      searchData = data.vehicles;
    }

    if (searchData.length == 0) {
      res.status(404).json(null);
    } else {
      res.status(200).json(searchData);
    }
  });

  return api;
};
