import config from '../config';
import { unlinkSync } from 'fs';

const uploadImageToCloudinary = async (filePath: string) => {
    const result = await config.cloudinary.uploader.upload(filePath, {
        folder: 'uploads'
    })
    unlinkSync(filePath)

    return {
        url: result.secure_url,
    }
}

const imageServices = {
    uploadImageToCloudinary
}

export default imageServices