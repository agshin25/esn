import { Router } from "express";
import imageControllers from "../controllers/image.controller";
import { upload } from "../middlewares/multer.middleware";


const imageRouter = Router()

imageRouter.post("/create", upload.array("image", 3), imageControllers.uploadImageToCloudinary)
imageRouter.delete("/delete/:id" , imageControllers.deleteImg)

export default imageRouter