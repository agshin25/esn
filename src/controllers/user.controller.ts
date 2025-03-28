import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";

const changeRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log("in controller");
  try {
    const { role } = req.body;
    const { userId } = req.params;

    const response = await userService.changeRole(parseInt(userId), role);

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export default { changeRole };
