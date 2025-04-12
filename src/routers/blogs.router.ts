import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import blogValidations from "../validations/blog.validations";
import blogControllers from "../controllers/blogs.controller";
import { upload } from "../middlewares/multer.middleware";

const blogRouter = Router()

blogRouter.get("/", blogControllers.getBlogs)
blogRouter.get("/:id", blogControllers.getBlog)
blogRouter.post("/create",validationMiddleware(blogValidations.create), upload.array("image", 5) , blogControllers.create)
blogRouter.post("/update/:id", validationMiddleware(blogValidations.update), upload.array("image", 5), blogControllers.update)
blogRouter.delete("/delete/:id", blogControllers.deleteBlog)

export default blogRouter