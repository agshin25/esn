import { RequestHandler, Router } from "express";
import authRouter from "./auth.router";
import bookingRouter from "./booking.router";
import userRouter from "./user.router";
import { authenticateToken } from "../middlewares/authenticateToken.middleware";
import { checkRoleMiddleWare } from "../middlewares/checkRole.middleware";
import { role } from "../types/role";
import meetingRouter from "./meeting.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/booking", authenticateToken as RequestHandler, bookingRouter);
router.use(
  "/users",
  authenticateToken as RequestHandler,
  checkRoleMiddleWare([role.ADMIN]) as RequestHandler,
  userRouter
);
router.use(
  "/meetings",
  authenticateToken as RequestHandler,
  checkRoleMiddleWare([
    role.BOARD_MEMBER,
    role.BOARD_MEMBER_SUPPORTER,
    role.MEMBER,
  ]) as RequestHandler,
  meetingRouter
);

export default router;
