import { Router } from "express";
import authRouter from "./auth.router";
import blogRouter from "./blogs.router";
import imageRouter from "./image.router";


const router = Router()

router.use("/auth" , authRouter)
router.use("/blogs", blogRouter )
router.use("/images", imageRouter)

export default router