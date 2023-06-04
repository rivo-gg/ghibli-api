/* Import modules */
import { Router, Request, Response } from "express";

let apiLatency = 0;

// Export router
export default (urlName: string): Router => {
  const api = Router();

  // Middleware to calculate API latency
  api.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const end = Date.now();
      apiLatency = end - start;
    });
    next();
  });

  // Get latency in ms
  api.get(`/${urlName}`, (req: Request, res: Response) => {
    res.status(200).json({ latency: apiLatency });
  });

  return api;
};
