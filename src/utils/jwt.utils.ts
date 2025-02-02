import config from "../config";
import jwt from "jsonwebtoken";

const JWT_SECRET = config.jwtSecret;

export const encode = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET);
};

export const compare = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
