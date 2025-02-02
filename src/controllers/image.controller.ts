import { NextFunction, Request, Response } from "express";
import imageServices from "../services/image.service";

const uploadImageToCloudinary = async (req: Request , res: Response, next: NextFunction): Promise<void> => {
    try {        
        if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
            res.status(400).json({ message: 'No files uploaded. Please upload images.' });
        }

        const filePaths = (req.files as Express.Multer.File[]).map(file => file.path);

        const uploadPromises = filePaths.map(async (filePath) => {
            try {
                const cloudinaryResult = await imageServices.uploadImageToCloudinary(filePath);
                return cloudinaryResult.url;
            } catch (uploadError) {
                console.error(`Failed to upload file at ${filePath}`, uploadError);
                throw new Error(`Failed to upload one or more images`);
            }
        });

        const imageUrls = await Promise.all(uploadPromises);

        res.status(200).json(imageUrls);
    } catch (error) {
        console.log("e",error);
        next(error)
    }
}

const imageControllers = {
    uploadImageToCloudinary
}

export default imageControllers