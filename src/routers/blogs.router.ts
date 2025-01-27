import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import blogValidations from "../validations/blog.validations";
import blogControllers from "../controllers/blogs.controller";

const blogRouter = Router()

blogRouter.post("/", validationMiddleware(blogValidations.create), blogControllers.create)

export default blogRouter