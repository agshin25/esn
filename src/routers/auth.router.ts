import { RequestHandler, Router } from "express";
import authController from "../controllers/auth.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import authValidations from "../validations/auth.validations";

const authRouter = Router();

authRouter.post(
  "/register",
  validationMiddleware(authValidations.register),
  authController.register
);
authRouter.post("/login", authController.login);

export default authRouter;
