import { RequestHandler, Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import authValidations from "../validations/auth.validations";

const authRouter = Router();

authRouter.post(
  "/register",
  validationMiddleware(authValidations.register),
  register as RequestHandler
);
authRouter.post("/login", login as RequestHandler);

export default authRouter;
