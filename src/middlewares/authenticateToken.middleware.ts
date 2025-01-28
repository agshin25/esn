import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const JWT_SECRET = config.jwtSecret;

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
  console.log(req.headers);
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info to req
    next();
  } catch (e) {
    res.status(403).json({ message: "Invalid token" });
  }
};
