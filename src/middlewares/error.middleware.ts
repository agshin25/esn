import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error.utils";

export const errorMiddleware = (err: AppError | Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        console.log(err.message);
        res.status(err.statusCode).json({error: err.message})
    }

    res.status(500).json({error: "Interval server error"})
}