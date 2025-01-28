import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validationMiddleware = (
  schema: z.Schema<any>,
  type: "body" | "query" | "params" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(schema, type);
    const { success, data, error } = schema.safeParse(req[type]);

    if (success) {
      req[type] = data;
      next();
    } else {
      res.status(400).json({ error: error?.issues });
    }
  };
};
