/* Import modules */
import { Router, Request, Response } from "express";

// Export router
export default (urlName: string, data: any): Router => {
  const api = Router();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  api.get(`/${urlName.toLowerCase()}:id`, (req: Request, res: Response) => {
    let searchData = [];
    const lowercaseId = req.params.id.toLowerCase();
  
    if (req.params.id.split("-").length == 5) {
      searchData = data.films.filter((f: any) => f.id == lowercaseId);
    } else {
      searchData = data.films.filter((f: any) =>
        f.title.toLowerCase().includes(lowercaseId)
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
