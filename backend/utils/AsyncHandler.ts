import { Request, Response, NextFunction, RequestHandler } from "express";

const AsyncHandler = (func: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
};

export default AsyncHandler;