import { NextFunction, Request, Response } from "express";
import { GlobalError } from "../utils/GlobalError";

export const errorMiddleware = (
  err: GlobalError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode;
  const message = err.message;
  console.log(statusCode);

  return res.status(statusCode || 500).json({
    success: false,
    data: {},
    message: message || "Internal Server Error",
  });
};
