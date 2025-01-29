import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { compare } from "../utils/jwt.utils";

declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload | string;
    }
  }
}

/* Bearer [TOKEN] */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = compare(token);
    req.user = decoded; // attach user info to req
    next();
  } catch (e) {
    res.status(403).json({ message: "Invalid token" });
  }
};
