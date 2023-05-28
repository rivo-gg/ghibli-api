/* Import modules */
import { Router, Request, Response } from "express";

// Export router
export default (urlName: string, data: any): Router => {
  const api = Router();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  api.get(`/${urlName}:id`, (req: Request, res: Response) => {
    let searchData = [];
    if (req.params.id.split("-").length == 5) {
      searchData = data.people.filter((p: any) => p.id == req.params.id);
    } else {
      searchData = data.people.filter((p: any) =>
        p.name.includes(req.params.id)
      );
    }

    if (searchData.length == 0) {
      res.send("null");
    } else {
      res.json(searchData);
    }
  });

  return api;
};
