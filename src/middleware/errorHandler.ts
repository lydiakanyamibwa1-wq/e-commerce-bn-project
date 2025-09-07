import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
};
