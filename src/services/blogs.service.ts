import dataSource from "../config/database"
import { BlogEntity } from "../models/blog.entity"
import { CreateBlogDto } from "../types/blog"

const create = async (params: CreateBlogDto) => {
    let blogRepo = dataSource.getRepository(BlogEntity)

    let blog = blogRepo.create(params)

    await blog.save()

    return blog
}

const blogServices = {
    create
}

export default blogServices