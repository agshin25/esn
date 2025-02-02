import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error.utils";

<<<<<<< HEAD
export const errorMiddleware = (err: AppError | Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        console.log(err.message);
        res.status(err.statusCode).json({error: err.message})
    }

    res.status(500).json({error: "Interval seerver error"})
}
=======
export const errorMiddleware = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    console.log(err.message);
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Interval server error" });
  }
};
>>>>>>> 58919d86cfac24af55a9d9f89eabc910b79f85b2
