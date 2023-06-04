import { Router, Request, Response } from "express";
import DailyAverage from "../../schemas/stats";

export default (urlName: string, data: any): Router => {
    const api = Router();

    api.get("/stats", async (req: Request, res: Response) => {
      try {
        // Fetch daily average API calls from the database
        const apiCalls = await DailyAverage.find();
  
        // Calculate the total number of API calls
        const totalApiCalls = apiCalls.reduce((total, doc) => total + doc.count, 0);
  
        res.json({
          dailyAverage: apiCalls,
          totalApiCalls,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  
    return api;
};
