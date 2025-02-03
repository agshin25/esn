import dataSource from "../config/database"
import { BlogEntity } from "../models/blog.entity"
import { Image } from "../models/image.entity"
import { CreateBlogDto, UpdateBlogDto } from "../types/blog"
import { AppError, NotFoundError } from "../utils/error.utils";
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

const getBlog = (id: number) => BlogEntity.findOne({
    where: {id},
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

const update = async (id: number, filePaths: string[] ,params: UpdateBlogDto) => {
    let blogRepo = dataSource.getRepository(BlogEntity)
    let imageRepo = dataSource.getRepository(Image)


    let blog = await blogRepo.findOne({ where: { id } })

    if (!blog) throw new NotFoundError("Blog does not exist")

    const uploadPromises = filePaths.map(async (filePath) => {
        const cloudinaryResult = await imageServices.uploadImageToCloudinary(filePath);
        return cloudinaryResult.url
    })

    if (!uploadPromises) throw new AppError("Failed to upload one or more images", 400)
    const imageUrls = await Promise.all(uploadPromises);


    const imageEntities = imageUrls.map(url => {
        const image = imageRepo.create({
            url,
            blog,
        });
        return imageRepo.save(image);
    });

    await Promise.all(imageEntities);
    await blogRepo.update(id, params)

    return update
}

const deleteBlog = async (id: number) => {
    let blog = await BlogEntity.findOne({where: {id}})

    if(!blog) throw new NotFoundError("Blog does not exist")

    await blog.remove()

    return blog
}

const blogServices = {
    create,
    getBlogs,
    getBlog,
    deleteBlog,
    update
}

export default blogServices