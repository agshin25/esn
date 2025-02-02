import { Router } from "express";
import imageControllers from "../controllers/image.controller";
import { upload } from "../middlewares/multer.middleware";


const imageRouter = Router()

imageRouter.post("/create", upload.array("image", 3), imageControllers.uploadImageToCloudinary)

export default imageRouter