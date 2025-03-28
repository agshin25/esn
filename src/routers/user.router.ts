import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/:userId/role", userController.changeRole);

export default userRouter;
