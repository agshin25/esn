import { NextFunction, Response } from "express"
import { AppError } from "../utils/error.utils"
import { AuthorizedRequest } from "../types/auth"

export const roleMiddleware = (...roles: string[]) => {
    return (req: AuthorizedRequest, res: Response, next: NextFunction) => {
        if (roles.includes(req.user.role)) return next()

        next(new AppError("Forbidden", 403))
    }
}