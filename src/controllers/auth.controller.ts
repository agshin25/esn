import { Response, Request, NextFunction } from "express";
import authService from "../services/auth.service";
import { User } from "../models/User.entity";

/* 
register 
  -> req - { username: string, password: string }
  -> return { user }

login 
  -> req - { username: string, password: string }
  -> return -> { token, user }
*/

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.register(req.body);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.login(req.body);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export default { register, login };
