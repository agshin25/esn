import config from '../config';
import { unlinkSync } from 'fs';
import { Image } from '../models/image.entity';
import { NotFoundError } from '../utils/error.utils';

const uploadImageToCloudinary = async (filePath: string) => {
    const result = await config.cloudinary.uploader.upload(filePath, {
        folder: 'uploads'
    })
    unlinkSync(filePath)

    return {
        url: result.secure_url,
    }
}

const deleteImg = async (id: number) => {
    let img = await Image.findOne({where: {id}})
    if(!img) throw new NotFoundError("Image is not found")

    await img.remove()

    return img
}

const imageServices = {
    uploadImageToCloudinary,
    deleteImg
}

export default imageServices