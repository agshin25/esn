import dataSource from "../config/database"
import { BlogEntity } from "../models/blog.entity"
import { Image } from "../models/image.entity"
import { CreateBlogDto } from "../types/blog"
import { AppError } from "../utils/error.utils";
import imageServices from "./image.service";


const getBlogs = () => BlogEntity.find({
    relations: ["images"],
    select: {
        id: false,
        images: {
            url: true,
            id: false
        },
        createdAt: false
    }    
})

const create = async (filePaths: string[], params: CreateBlogDto) => {
    let blogRepo = dataSource.getRepository(BlogEntity)
    let imageRepo = dataSource.getRepository(Image)

    const uploadPromises = filePaths.map(async (filePath) => {
        const cloudinaryResult = await imageServices.uploadImageToCloudinary(filePath);
        return cloudinaryResult.url
    } )

    if (!uploadPromises) throw new AppError("Failed to upload one or more images", 400)
    const imageUrls = await Promise.all(uploadPromises);

    let blog = blogRepo.create(params)
    await blog.save()

    const imageEntities = imageUrls.map(url => {
        const image = imageRepo.create({
            url, 
            blog,
        });
        return imageRepo.save(image); 
    });

    await Promise.all(imageEntities);

    return blog;
}

const blogServices = {
    create,
    getBlogs
}

export default blogServices