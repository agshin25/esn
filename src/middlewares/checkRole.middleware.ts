import { NextFunction, Request, Response } from "express";
import { findUserById } from "../services/auth.service";
import { role } from "../types/role";
import { UserRequest } from "../controllers/meeting.controller";

export const checkRoleMiddleWare = (roles: role[]) => {
  return async (req: UserRequest, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!user) {
      return;
    }

    try {
      const candidate = await findUserById(req.user.id);

      if (!candidate) {
        return;
      }

      if (!roles.includes(candidate?.role)) {
        return res.status(500).json({ message: "Role is not supported" });
      }

      next();
    } catch (e) {
      res.status(500).json({ message: "User was not found" });
    }
  };
};
