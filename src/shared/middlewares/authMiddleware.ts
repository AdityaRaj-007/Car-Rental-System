import { NextFunction, Request, Response } from "express";
import { GlobalError } from "../utils/GlobalError";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthRequest<
  P = {},
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: {
    username: string;
    id: string;
  };
}

export const isAuthorized = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.get("authorization");
  console.log(req.headers);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new GlobalError(401, "UNAUTHORIZED"));
  }

  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    return next(new GlobalError(401, "UNAUTHORIZED"));
  }

  try {
    if (!JWT_SECRET) {
      throw new Error("Please provide JWT_SECRET env.");
    }
    const decoded = jwt.verify(token, JWT_SECRET) as {
      username: string;
      id: string;
    };

    req.user = decoded;
    next();
  } catch (err) {
    next(new GlobalError(401, "UNAUTHORIZED"));
  }
};
