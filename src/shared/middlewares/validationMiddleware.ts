import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { GlobalError } from "../utils/GlobalError";

type ValidationSchema = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
};

export const validate =
  <T extends ValidationSchema>(schema: ZodType<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if (validatedData.body) {
        req.body = validatedData.body;
      }

      if (validatedData.query) {
        Object.assign(req.query, validatedData.query);
      }

      if (validatedData.params) {
        req.params = validatedData.params as Request["params"];
      }

      next();
    } catch (err) {
      console.log(err);
      console.log("Validation error");
      return next(new GlobalError(400, "INVALID_REQUEST"));
    }
  };
