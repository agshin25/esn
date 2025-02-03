import { Router } from "express";
import blogRouter from "./blogs.router";
import imageRouter from "./image.router";



const router = Router();


router.use("/blogs", blogRouter )
router.use("/images", imageRouter)


export default router;

