import { RequestHandler, Router } from "express";
import authRouter from "./auth.router";
import blogRouter from "./blogs.router";
import { authenticateToken } from "../middlewares/authenticateToken.middleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/blogs", authenticateToken as RequestHandler, blogRouter);

export default router;
