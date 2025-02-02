import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import blogValidations from "../validations/blog.validations";
import blogControllers from "../controllers/blogs.controller";
import { upload } from "../middlewares/multer.middleware";

const blogRouter = Router()

blogRouter.get("/", blogControllers.getBlogs)
blogRouter.post("/create", upload.array("image", 3) , blogControllers.create)

export default blogRouter