import { Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt";
import authService from "../services/auth.service";
import jwt from "jsonwebtoken";
import config from "../config";
import { AppError } from "../utils/error.utils";

/* 
register 
  -> req - { username: string, password: string }
  -> return { token }

login 
  -> req - { token: string }
  -> return 
*/

const JWT_SECRET = config.jwtSecret;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const candidate = await authService.findUser(username);

    if (candidate) {
      return next(new AppError("This user already exists", 500));
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await authService.saveUser({
      username,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User was successfully created" });
  } catch (e) {
    next(e);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const user = await authService.findUser(username);

    if (!user) {
      return next(
        new AppError("Either password or username is incorrect", 500)
      );
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return next(
        new AppError("Either password or username is incorrect", 500)
      );
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1hr" });
    res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
};

export default { register, login };
