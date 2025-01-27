import { Router } from "express";
import authRouter from "./auth.router";
import blogRouter from "./blogs.router";


const router = Router()

router.use("/auth" , authRouter)
router.use("/blogs", blogRouter )

export default router