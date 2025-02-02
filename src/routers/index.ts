import { RequestHandler, Router } from "express";
import authRouter from "./auth.router";
import blogRouter from "./blogs.router";
<<<<<<< HEAD
import imageRouter from "./image.router";
=======
import { authenticateToken } from "../middlewares/authenticateToken.middleware";
>>>>>>> 58919d86cfac24af55a9d9f89eabc910b79f85b2

const router = Router();

router.use("/auth", authRouter);
router.use("/blogs", authenticateToken as RequestHandler, blogRouter);

<<<<<<< HEAD
router.use("/auth" , authRouter)
router.use("/blogs", blogRouter )
router.use("/images", imageRouter)

export default router
=======
export default router;
>>>>>>> 58919d86cfac24af55a9d9f89eabc910b79f85b2
